import { Packages } from '@Packages';
const { injectable } = Packages.inversify;

import { IAbstractService, IDiscoveryService } from '@Core/Types';

@injectable()
export abstract class AbstractService implements IAbstractService {
  protected abstract _SERVICE_NAME: string;
  protected abstract _discoveryService: IDiscoveryService;

  public async start(): Promise<void> {
    if (await this.init()) {
      console.log(`Service ${this._SERVICE_NAME} is started`);
    }
  }
  public async stop(): Promise<void> {}

  protected abstract init(): Promise<boolean>;
  protected abstract destroy(): Promise<void>;
}
