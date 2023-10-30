import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractService } from './abstract.service';

import { IAbstractApplicationList } from '@Documents/Types';
import {
  IAbstractFactory,
  IApplicationSchemaLoader,
  IDiscoveryService,
  IGetawayService,
  ILoggerService,
  NGetawayService,
} from '@Core/Types';

@injectable()
export class GetawayService extends AbstractService implements IGetawayService {
  protected readonly _SERVICE_NAME = GetawayService.name;
  private _config: NGetawayService.Config | undefined;
  private _APP_SCHEMA: IAbstractApplicationList | undefined;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected _loggerService: ILoggerService,
    @inject(CoreSymbols.FrameworkFactory)
    private _frameworkFactory: IAbstractFactory,
    @inject(CoreSymbols.ApplicationSchemaLoader)
    private _applicationSchemaLoader: IApplicationSchemaLoader
  ) {
    super();
  }

  private _setConfig(): void {
    this._config = {
      appsPath: this._discoveryService.getMandatory<'string'>('api:business-schema-path'),
    };
  }

  protected async init(): Promise<boolean> {
    this._setConfig();

    if (!this._config) throw this._getConfigError();

    try {
      await this._applicationSchemaLoader.init();

      const { apps } = await import(this._config.appsPath);

      this._APP_SCHEMA = apps;
      apps.setAppToSchema(this._applicationSchemaLoader);

      await this._frameworkFactory.start();
      return true;
    } catch (e) {
      this._loggerService.error(e, {
        type: 'core',
        moduleName: 'GetawayService',
        executeTag: 'Config',
      });
      return false;
    }
  }

  protected async destroy(): Promise<void> {
    this._config = undefined;
    this._APP_SCHEMA = undefined;
  }

  private _getConfigError() {
    return new Error('Config not set');
  }
}
