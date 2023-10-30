import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { fastify } = Packages.fastify;
import { CoreSymbols } from '@CoreSymbols';
import { ResponseType, SchemaHeaders, StatusCode } from '@Common';
import { Guards } from '../../utils/guards';

import { AbstractFrameworkAdapter } from './abstract.framework.adapter';
import {
  IAbstractFrameworkAdapter,
  IApplicationSchemaLoader,
  IAsyncStorageService,
  IBusinessAgent,
  IDiscoveryService,
  ILoggerService,
  IStreamsService,
  NAbstractFrameworkAdapter,
  NStreamsService,
} from '@Core/Types';
import { HttpResponseType, HTTPStatusCode } from '@Utility/Types';

@injectable()
export class FastifyFrameworkAdapter
  extends AbstractFrameworkAdapter
  implements IAbstractFrameworkAdapter
{
  protected readonly _ADAPTER_NAME = FastifyFrameworkAdapter.name;
  protected _framework: NAbstractFrameworkAdapter.FrameworkInstance;
  protected _config: NAbstractFrameworkAdapter.Config | undefined;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected _loggerService: ILoggerService,
    @inject(CoreSymbols.StreamsService)
    private _streamService: IStreamsService,
    @inject(CoreSymbols.AsyncStorageService)
    private _asyncStorageService: IAsyncStorageService,
    @inject(CoreSymbols.ApplicationSchemaLoader)
    protected _applicationSchemaLoader: IApplicationSchemaLoader,
    @inject(CoreSymbols.BusinessAgent)
    private _businessAgent: IBusinessAgent
  ) {
    super();
  }

  protected _setConfig(): void {
    this._config = {
      connect: {
        protocol: this._discoveryService.getString({
          name: 'api:connect:protocol',
          def: 'http',
        }),
        host: this._discoveryService.getString({
          name: 'api:connect:host',
          def: 'localhost',
        }),
        port: this._discoveryService.getNumber({
          name: 'api:connect:port',
          def: 23012,
        }),
      },
      urls: {
        api: this._discoveryService.getString({
          name: 'api:urls:api',
          def: '/v1/call/api',
        }),
      },
      serverTag: this._discoveryService.getString({
        name: 'api:serverTag',
        def: 'ANONYMOUS_1',
      }),
      applicationSchemaPath: this._discoveryService.getMandatory<'string'>(
        'api:business-schema-path'
      ),
      streamAccumulateType: this._discoveryService.getString({
        name: 'api:stream-accumulate-type',
        def: 'temp-file',
      }),
    };
  }

  public async start(): Promise<void> {
    this._setConfig();
    if (!this._config) throw new Error('');

    this._framework = fastify({});
    this._framework.register(require('@fastify/multipart'));
    this._framework.post('/v1/streams', this._streamsHandler);
    this._framework.all(
      this._config.urls.api + '/:application/:collection/:version/:action',
      this._apiHandler
    );

    try {
      await this._framework.listen(
        { host: this._config.connect.host, port: this._config.connect.port },
        () => {
          if (this._config) {
            const { protocol, host, port } = this._config.connect;

            console.log(`Http server listening on ${protocol}://${host}:${port}`);
          } else {
            console.log(`Http server is started`);
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  protected _apiHandler = async (
    req: NAbstractFrameworkAdapter.Request,
    res: NAbstractFrameworkAdapter.Response
  ): Promise<void> => {};

  protected _streamsHandler = async (
    req: NAbstractFrameworkAdapter.Request,
    res: NAbstractFrameworkAdapter.Response
  ): Promise<void> => {
    if (!this._config) {
      throw new Error('Config not initialize');
    }

    if (!Guards.tgIsSchemaHeadersExists(req.headers)) {
      return res.status(StatusCode.BAD_REQUEST).send({
        responseType: ResponseType.FAIL,
        data: {
          message: `Some schema headers not send. Headers: "${SchemaHeaders.X_APPLICATION_NAME}", "${SchemaHeaders.X_COLLECTION_NAME}", "${SchemaHeaders.X_VERSION}", "${SchemaHeaders.X_ACTION_NAME}", "${SchemaHeaders.X_ACTION_METHOD}" must be fill`,
        },
      });
    }

    const route = this._getCollectionRoute({
      application: req.headers[SchemaHeaders.X_APPLICATION_NAME],
      collection: req.headers[SchemaHeaders.X_COLLECTION_NAME],
      version: req.headers[SchemaHeaders.X_VERSION],
      action: req.headers[SchemaHeaders.X_ACTION_NAME],
      method: req.headers[SchemaHeaders.X_ACTION_METHOD],
    });

    if (route.status === 'miss') {
      return res.status(StatusCode.BAD_REQUEST).send({
        responseType: ResponseType.FAIL,
        data: {
          message: `Incorrect key - ${route.field}`,
        },
      });
    }

    if (!route.info.isStreamData) {
      return res.send(StatusCode.BAD_REQUEST).send({
        responseType: ResponseType.FAIL,
        data: {
          message: `Route not supported stream data`,
        },
      });
    }

    try {
      const accumulateInfo = await this._streamService.resolveAccumulateStreamType(
        route.info.streamType,
        req
      );

      switch (accumulateInfo.streamType) {
        case 'buffer':
          const { files } = accumulateInfo;
          let data: { file?: NStreamsService.FileInfo; files?: NStreamsService.FileInfo[] } = {};
          files.length === 1 ? (data['file'] = files[0]) : (data['files'] = files);

          return res.status(StatusCode.SUCCESS).send({
            responseType: ResponseType.SUCCESS,
            data,
          });
        case 'temp-file':
        case 'temp-s3-strategy':
          return res.status(StatusCode.SUCCESS).send({
            responseType: ResponseType.FAIL,
            data: {
              message: `Temporary save format "${accumulateInfo.streamType}" is not supported`,
            },
          });
      }
    } catch (e) {
      console.log(e);

      return res.status(StatusCode.SERVER_ERROR).send({
        responseType: ResponseType.ERROR,
        data: {
          message: 'Something was wrong...',
        },
      });
    }
  };

  private _getCollectionRoute(
    params: NAbstractFrameworkAdapter.CollectionRouteParams
  ): NAbstractFrameworkAdapter.GetCollectionRoute {
    const application = this._applicationSchemaLoader.appSchema.get(params.application);
    if (!application) return { status: 'miss', field: 'application' };

    const collection = application.collections.get(params.collection);
    if (!collection) return { status: 'miss', field: 'collection' };

    const action = params.version + '/' + params.action + '{{' + params.method.toUpperCase() + '}}';
    const route = collection.routes.get(action);
    if (!route) return { status: 'miss', field: 'action' };

    return { status: 'success', info: route };
  }

  protected _getRequestType(response: {
    status: HTTPStatusCode[keyof HTTPStatusCode];
    responseType: HttpResponseType;
  }) {
    switch (response.status) {
      case '100':
      case '101':
      case '102':
      case '103':
        return response.responseType ?? ResponseType.INFO;
      case '200':
      case '201':
      case '202':
      case '203':
      case '204':
      case '205':
      case '206':
        return response.responseType ?? ResponseType.SUCCESS;
      case '300':
      case '301':
      case '302':
      case '303':
      case '304':
      case '305':
      case '306':
      case '307':
      case '308':
        return response.responseType ?? ResponseType.REDIRECT;
      case '400':
      case '401':
      case '402':
      case '403':
      case '404':
      case '405':
      case '406':
      case '407':
      case '408':
      case '409':
      case '410':
      case '411':
      case '412':
      case '413':
      case '414':
      case '415':
      case '416':
      case '417':
        return response.responseType ?? ResponseType.FAIL;
      case '500':
      case '501':
      case '502':
      case '503':
      case '504':
      case '505':
        return response.responseType ?? ResponseType.ERROR;
    }
  }
}
