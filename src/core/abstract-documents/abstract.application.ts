import { Packages } from '@Packages';
const { injectable } = Packages.inversify;

import { IAbstractApplication, IAbstractCollector } from '@Documents/Types';
import { IApplicationSchemaLoader } from '@Core/Types';

@injectable()
export abstract class AbstractApplication implements IAbstractApplication {
  protected abstract _APPLICATION_NAME: string;
  protected abstract _collectors: Set<IAbstractCollector>;

  public setAppToSchema(loader: IApplicationSchemaLoader): void {
    this._collectors.forEach((collector: IAbstractCollector): void => {
      collector.setAppToSchema(this._APPLICATION_NAME, loader);
    });
  }
}
