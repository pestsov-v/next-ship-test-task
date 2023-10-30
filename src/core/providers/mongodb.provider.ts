import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { mongoose } = Packages.mongoose;
import { CoreSymbols } from '@CoreSymbols';

import { Mongoose } from '@Packages/Types';
import {
  IAsyncStorageService,
  IDiscoveryService,
  ILoggerService,
  IMongodbConnector,
  IMongodbProvider,
  NApplicationSchemaLoader,
  NMongodbProvider,
} from '@Core/Types';

@injectable()
export class MongodbProvider implements IMongodbProvider {
  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected _loggerService: ILoggerService,
    @inject(CoreSymbols.AsyncStorageService)
    private _asyncStorageService: IAsyncStorageService,
    @inject(CoreSymbols.MongoDBConnector)
    private _mongodbConnector: IMongodbConnector
  ) {}

  public setMongoModel(appSchemas: NApplicationSchemaLoader.CollectionMongoSchema[]): void {
    // TODO: change from setTimeout to emitter - when dbConnector initialized - emit event and subscribe for this event into provider
    setTimeout(() => {
      appSchemas.forEach((appSchema) => {
        const schema = appSchema.options
          ? new mongoose.Schema(appSchema.schema, appSchema.options)
          : new mongoose.Schema(appSchema.schema);

        this._mongodbConnector.connection.model(appSchema.name, schema);
      });
    }, 1000);
  }

  public async create<TRawDocType>(
    model: string,
    docs: Mongoose.Docs<TRawDocType>,
    options?: Mongoose.SaveOptions
  ): Promise<Mongoose.AnyKeys<TRawDocType>> {
    const models = this._mongodbConnector.connection.models;
    if (!models) this._throwModelsError();

    try {
      return options
        ? await models[model].create<TRawDocType>(docs, options)
        : await models[model].create<TRawDocType>(docs);
    } catch (e) {
      this._logCatchError(e);
      throw e;
    }
  }

  public async aggregate<TRowDocType>(
    model: string,
    details: NMongodbProvider.AggregateDetails
  ): Promise<Mongoose.AggregateResult<TRowDocType>> {
    const models = this._mongodbConnector.connection.models;
    if (!models) this._throwModelsError();

    try {
      return details.options
        ? await models[model].aggregate<TRowDocType>(details.pipeline, details.options)
        : await models[model].aggregate<TRowDocType>(details.pipeline);
    } catch (e) {
      this._logCatchError(e);
      throw e;
    }
  }

  public async insertMany<TRowDocType>(
    model: string,
    details: NMongodbProvider.InsertManyDetails<TRowDocType>
  ): Promise<Mongoose.InsertManyResult<TRowDocType>> {
    const models = this._mongodbConnector.connection.models;
    if (!models) this._throwModelsError();

    try {
      return details.options
        ? await models[model].insertMany<TRowDocType>(details.docs, details.options)
        : await models[model].insertMany<TRowDocType>(details.docs);
    } catch (e) {
      this._logCatchError(e);
      throw e;
    }
  }

  private _logCatchError(e: any) {
    this._loggerService.error(e, {
      type: 'core',
      executeTag: 'Executor',
      moduleName: 'MongodbService',
      requestId: this._asyncStorageService.store.requestId,
    });
  }

  private _throwModelsError() {
    return new Error('MogoDB models not set');
  }
}
