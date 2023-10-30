import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';

import { AbstractConnector } from './abstract.connector';

import { IDiscoveryService, IServicesConnector } from '@Core/Types';

@injectable()
export class ServiceConnector extends AbstractConnector implements IServicesConnector {
  constructor(
    @inject(CoreSymbols.DiscoveryService)
    private _discoveryService: IDiscoveryService
  ) {
    super();
  }

  public async start(): Promise<void> {
    await this._discoveryService.start();
  }

  public async stop(): Promise<void> {
    await this._discoveryService.stop();
  }
}
