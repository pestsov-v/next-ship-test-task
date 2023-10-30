import { Packages } from '@Packages';
const { injectable } = Packages.inversify;

import { IApplicationSchemaLoader } from '@Core/Types';
import { IAbstractApplication, IAbstractApplicationList } from '@Documents/Types';

@injectable()
export abstract class AbstractApplicationList implements IAbstractApplicationList {
  protected abstract _apps: Set<IAbstractApplication>;

  public setAppToSchema(loader: IApplicationSchemaLoader): void {
    this._apps.forEach((collector: IAbstractApplication): void => {
      collector.setAppToSchema(loader);
    });
  }
}
