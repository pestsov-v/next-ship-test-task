import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';

import { IInitiator, IServicesConnector } from '@Core/Types';

@injectable()
export class Initiator implements IInitiator {
  constructor(
    @inject(CoreSymbols.ServiceConnector)
    private _serviceConnector: IServicesConnector
  ) {}

  public async start(): Promise<void> {
    await this._serviceConnector.start();
  }

  public async stop(): Promise<void> {
    await this._serviceConnector.stop();
  }
}
