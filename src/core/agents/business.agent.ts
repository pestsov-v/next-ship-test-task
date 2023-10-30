import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { Mongoose } from '@Packages/Types';
import { Nullable, UUID } from '@Utility/Types';

import {
  IAsyncStorageService,
  IBusinessAgent,
  IDiscoveryService,
  ILoggerService,
  IMongodbProvider,
  IStreamsService,
  NBusinessAgent,
  NDiscoveryService,
  NLoggerService,
  NMongodbProvider,
  NStreamsService,
} from '@Core/Types';

@injectable()
export class BusinessAgent implements IBusinessAgent {
  constructor(
    @inject(CoreSymbols.DiscoveryService)
    private _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    private _loggerService: ILoggerService,
    @inject(CoreSymbols.AsyncStorageService)
    private _asyncStorageService: IAsyncStorageService,
    @inject(CoreSymbols.StreamsService)
    private _streamsService: IStreamsService,
    @inject(CoreSymbols.MongodbProvider)
    private _mongodbProvider: IMongodbProvider
  ) {}

  public get discovery(): NBusinessAgent.Discovery {
    return {
      getString: (
        params: NDiscoveryService.ParamWithDefault<'string'>
      ): NDiscoveryService.EnvResult<'string'> => {
        return this._discoveryService.getAppString(params);
      },
    };
  }

  public get logger(): NBusinessAgent.Logger {
    const store = this._asyncStorageService.store;

    return {
      error: (error: NLoggerService.Error): void => {
        this._loggerService.appError(error, {
          type: 'schema',
          action: store.action,
          method: store.method,
          application: store.application,
          collection: store.collection,
          version: store.version,
          requestId: store.requestId,
        });
      },
      info: (msg: string): void => {
        this._loggerService.appInfo(msg, {
          action: store.action,
          method: store.method,
          application: store.application,
          collection: store.collection,
          version: store.version,
          requestId: store.requestId,
        });
      },
      debug: (msg: unknown): void => {
        this._loggerService.appDebug(msg);
      },
    };
  }

  public get mongoose(): NBusinessAgent.Mongoose {
    return {
      create: async <TRawDocType>(
        model: string,
        docs: Mongoose.Docs<TRawDocType>,
        options?: Mongoose.SaveOptions
      ): Promise<Mongoose.AnyKeys<TRawDocType>> => {
        return this._mongodbProvider.create(model, docs, options);
      },
      aggregate: async <TRowDocType>(
        model: string,
        details: NMongodbProvider.AggregateDetails
      ): Promise<Mongoose.AggregateResult<TRowDocType>> => {
        return this._mongodbProvider.aggregate<TRowDocType>(model, details);
      },
      insertMany: async <TRowDocType>(
        model: string,
        details: NMongodbProvider.InsertManyDetails<TRowDocType>
      ): Promise<Mongoose.InsertManyResult<TRowDocType>> => {
        return this._mongodbProvider.insertMany<TRowDocType>(model, details);
      },
    };
  }

  public get streams(): NBusinessAgent.Streams {
    return {
      getFile: (streamId: UUID): Nullable<NStreamsService.StreamStorage> => {
        return this._streamsService.getFile(streamId);
      },
      getFileBuffer: (streamId: UUID): Nullable<Buffer> => {
        return this._streamsService.getFileBuffer(streamId);
      },
    };
  }
}
