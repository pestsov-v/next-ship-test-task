import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { mongoose } = Packages.mongoose;
const { EventEmitter } = Packages.events;
import { AbstractConnector } from './abstract.connector';

import {
  IDiscoveryService,
  ILoggerService,
  IMongodbConnector,
  NMongodbConnector,
} from '@Core/Types';
import { Mongoose } from '@Packages/Types';
import { CoreSymbols } from '@CoreSymbols';

@injectable()
export class MongodbConnector extends AbstractConnector implements IMongodbConnector {
  private _emitter = new EventEmitter();
  private _mongoose: Mongoose.Mongoose | undefined;
  private _config: NMongodbConnector.Config | undefined;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    private _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    private _loggerService: ILoggerService
  ) {
    super();
  }

  private _setConfig(): void {
    this._config = {
      enable: this._discoveryService.getBoolean({ name: 'mongodb:enable', def: true }),
      protocol: this._discoveryService.getString({
        name: 'mongodb:protocol',
        def: 'mongodb',
      }),
      host: this._discoveryService.getString({ name: 'mongodb:host', def: 'localhost' }),
      port: this._discoveryService.getNumber({ name: 'mongodb:port', def: 27017 }),
      database: this._discoveryService.getString({ name: 'mongodb:database', def: 'nisu' }),
      auth: {
        username: this._discoveryService.getString({
          name: 'mongodb:auth:username',
          def: 'root',
        }),
        password: this._discoveryService.getString({
          name: 'mongodb:auth:password',
          def: 'root',
        }),
      },
    };
  }

  public async start(): Promise<void> {
    this._setConfig();

    if (!this._config) {
      throw new Error('Mongodb connector condfig not set.');
    }

    if (!this._config.enable) {
      this._loggerService.warn('Mongodb connector condfig not set.');
      return;
    }

    if (this._mongoose) {
      return;
    }

    const url = `${this._config.protocol}://${this._config.host}:${this._config.port}`;

    const connectionOpts: Mongoose.ConnectionOptions = {
      dbName: this._config.database,
    };
    if (
      this._config.auth &&
      this._config.auth.password &&
      this._config.auth.password.length > 0 &&
      this._config.auth.username &&
      this._config.auth.username.length > 0
    ) {
      connectionOpts['auth'] = this._config.auth;
    }

    try {
      this._mongoose = await mongoose.connect(url, connectionOpts);
      console.log(`Mongodb connector has been started on ${url}`);

      this._emit('mongodb:connector:init');
    } catch (e: any) {
      this._loggerService.error(e, {
        type: 'core',
        executeTag: 'Config',
        moduleName: 'MongodbConnector',
      });
      throw e;
    }
  }

  public async stop(): Promise<void> {
    if (!this._mongoose) {
      return;
    }

    await this._mongoose.disconnect();
  }

  public get connection(): Mongoose.Mongoose {
    if (!this._mongoose) {
      throw new Error('Mongoose not initialize');
    }

    return this._mongoose;
  }

  private _emit(event: string): void {
    this._emitter.emit(event);
  }

  public on(event: string, listener: () => void): void {
    this._emitter.on(event, listener);
  }
}
