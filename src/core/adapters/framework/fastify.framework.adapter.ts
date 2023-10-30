import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { fastify } = Packages.fastify;
const { v4 } = Packages.uuid;
import { CoreSymbols } from '@CoreSymbols';

import { AbstractFrameworkAdapter } from './abstract.framework.adapter';
import {
  IAbstractFrameworkAdapter,
  IDiscoveryService,
  ILoggerService,
  NAbstractFrameworkAdapter,
} from '@Core/Types';

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
    protected _loggerService: ILoggerService
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
  ): Promise<void> => {};
}
