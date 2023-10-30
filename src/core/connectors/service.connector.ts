import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';

import { AbstractConnector } from './abstract.connector';

import {
  IDiscoveryService,
  IGetawayService,
  ILoggerService,
  IServicesConnector,
} from '@Core/Types';

@injectable()
export class ServiceConnector extends AbstractConnector implements IServicesConnector {
  constructor(
    @inject(CoreSymbols.DiscoveryService)
    private _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    private _loggerService: ILoggerService,
    @inject(CoreSymbols.GetawayService)
    private _getawayService: IGetawayService
  ) {
    super();
  }

  public async start(): Promise<void> {
    await this._discoveryService.start();
    await this._loggerService.start();
    await this._getawayService.start();
  }

  public async stop(): Promise<void> {
    await this._getawayService.stop();
    await this._loggerService.stop();
    await this._discoveryService.stop();
  }
}
