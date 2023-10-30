import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';

import { IInitiator, IMongodbConnector, IServicesConnector } from '@Core/Types';

@injectable()
export class Initiator implements IInitiator {
  constructor(
    @inject(CoreSymbols.ServiceConnector)
    private _serviceConnector: IServicesConnector,
    @inject(CoreSymbols.MongoDBConnector)
    private _mongodbConnector: IMongodbConnector
  ) {}

  public async start(): Promise<void> {
    await this._serviceConnector.start();
    await this._mongodbConnector.start();
  }

  public async stop(): Promise<void> {
    await this._mongodbConnector.stop();
    await this._serviceConnector.stop();
  }
}
