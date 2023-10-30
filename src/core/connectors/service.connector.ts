import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractConnector } from './abstract.connector';

import {
  IAsyncStorageService,
  IDiscoveryService,
  IGetawayService,
  ILoggerService,
  IServicesConnector,
  IStreamsService,
} from '@Core/Types';

@injectable()
export class ServiceConnector extends AbstractConnector implements IServicesConnector {
  constructor(
    @inject(CoreSymbols.DiscoveryService)
    private _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    private _loggerService: ILoggerService,
    @inject(CoreSymbols.GetawayService)
    private _getawayService: IGetawayService,
    @inject(CoreSymbols.AsyncStorageService)
    private _asyncStorageService: IAsyncStorageService,
    @inject(CoreSymbols.StreamsService)
    private _streamsService: IStreamsService
  ) {
    super();
  }

  public async start(): Promise<void> {
    await this._discoveryService.start();
    await this._loggerService.start();
    await this._getawayService.start();
    await this._asyncStorageService.start();
    await this._streamsService.start();
  }

  public async stop(): Promise<void> {
    await this._streamsService.stop();
    await this._asyncStorageService.stop();
    await this._getawayService.stop();
    await this._loggerService.stop();
    await this._discoveryService.stop();
  }
}
