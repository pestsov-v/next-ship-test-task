import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';

import {
  IAsyncStorageService,
  IBusinessAgent,
  IDiscoveryService,
  ILoggerService,
  NBusinessAgent,
  NDiscoveryService,
  NLoggerService,
} from '@Core/Types';

@injectable()
export class BusinessAgent implements IBusinessAgent {
  constructor(
    @inject(CoreSymbols.DiscoveryService)
    private _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    private _loggerService: ILoggerService,
    @inject(CoreSymbols.AsyncStorageService)
    private _asyncStorageService: IAsyncStorageService
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
}
