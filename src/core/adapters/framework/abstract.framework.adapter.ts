import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { ResponseType } from '@Common';

import {
  IAbstractFrameworkAdapter,
  IDiscoveryService,
  ILoggerService,
  NAbstractFrameworkAdapter,
} from '@Core/Types';

@injectable()
export abstract class AbstractFrameworkAdapter implements IAbstractFrameworkAdapter {
  protected abstract readonly _ADAPTER_NAME: string;
  protected abstract _framework: NAbstractFrameworkAdapter.FrameworkInstance | undefined;
  protected abstract _config: NAbstractFrameworkAdapter.Config | undefined;
  protected abstract _setConfig(): void;

  protected abstract _discoveryService: IDiscoveryService;
  protected abstract _loggerService: ILoggerService;

  public abstract start(): Promise<void>;

  protected abstract _apiHandler(
    req: NAbstractFrameworkAdapter.Request,
    res: NAbstractFrameworkAdapter.Response
  ): Promise<void>;

  protected _getNotFoundMessage(param: string): NAbstractFrameworkAdapter.NotFoundMessage {
    if (!this._config) {
      throw new Error('Config not initialize');
    }

    const { protocol, host, port } = this._config.connect;
    const { api } = this._config.urls;

    return {
      status: ResponseType.FAIL,
      message: `Incorrect ${param}`,
      correctPath: `${protocol}://${host}:${port}${api}/:application/:collection/:action`,
    };
  }
}
