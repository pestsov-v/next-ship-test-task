import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { AsyncLocalStorage } = Packages.async_hooks;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractService } from './abstract.service';

import { AsyncHooks } from '@Packages/Types';
import {
  IAsyncStorageService,
  IDiscoveryService,
  ILoggerService,
  NAsyncStorageService,
} from '@Core/Types';

@injectable()
export class AsyncStorageService extends AbstractService implements IAsyncStorageService {
  protected _SERVICE_NAME = AsyncStorageService.name;

  private _storage: AsyncHooks.AsyncLocalStorage<NAsyncStorageService.Store> | undefined;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected _loggerService: ILoggerService
  ) {
    super();
  }

  protected async init(): Promise<boolean> {
    this._storage = new AsyncLocalStorage<NAsyncStorageService.Store>();

    return true;
  }

  public get storage(): AsyncHooks.AsyncLocalStorage<NAsyncStorageService.Store> {
    if (!this._storage) {
      throw new Error('Storage not initialize');
    }
    return this._storage;
  }

  public get store(): NAsyncStorageService.Store {
    if (!this._storage) {
      throw new Error('Storage not initialize');
    }

    const store = this._storage.getStore();
    if (!store) {
      throw new Error('Async local store not found');
    }

    return store;
  }

  protected async destroy(): Promise<void> {
    this._storage = undefined;
  }
}
