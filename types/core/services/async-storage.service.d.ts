import { IAbstractService } from '@Core/Types';
import { AsyncHooks } from '@Packages/Types';

export interface IAsyncStorageService extends IAbstractService {
  readonly storage: AsyncHooks.AsyncLocalStorage<NAsyncStorageService.Store>;
  readonly store: NAsyncStorageService.Store;
}

export namespace NAsyncStorageService {
  export type Store = {
    requestId: string;
    ip: string;
    path: string;
    application: string;
    collection: string;
    action: string;
    method: string;
    version: string;
  };
}
