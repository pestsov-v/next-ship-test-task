import { Packages } from '@Packages';
const { injectable } = Packages.inversify;

import { IAbstractService, IDiscoveryService, ILoggerService } from '@Core/Types';

@injectable()
export abstract class AbstractService implements IAbstractService {
  protected abstract _SERVICE_NAME: string;
  protected abstract _discoveryService: IDiscoveryService;
  protected abstract _loggerService: ILoggerService | undefined;

  public async start(): Promise<void> {
    try {
      if (await this.init()) {
        console.log(`Service ${this._SERVICE_NAME} is started`);
      }
    } catch (e) {
      throw e;
    }
  }
  public async stop(): Promise<void> {
    try {
      await this.destroy();
    } catch (e) {
      throw e;
    }
  }

  protected abstract init(): Promise<boolean>;
  protected abstract destroy(): Promise<void>;
}
