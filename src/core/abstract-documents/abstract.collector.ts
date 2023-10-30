import { Packages } from '@Packages';
const { injectable } = Packages.inversify;

import { IAbstractCollector, IAbstractRouter } from '@Documents/Types';
import { IApplicationSchemaLoader } from '@Core/Types';

@injectable()
export abstract class AbstractCollector implements IAbstractCollector {
  protected abstract _COLLECTION_NAME: string;
  protected abstract _router: IAbstractRouter | undefined;

  public setAppToSchema(application: string, loader: IApplicationSchemaLoader) {
    if (this._router) {
      this._router.setRoutes(application, this._COLLECTION_NAME, loader);
    }
  }
}
