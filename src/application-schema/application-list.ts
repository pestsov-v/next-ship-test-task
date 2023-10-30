import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;

import { AbstractApplicationList } from '@Documents';
import { IAbstractApplication, IAbstractApplicationList } from '@Documents/Types';
import { AppsSymbols } from './ioc/apps.ioc.symbols';

@injectable()
export class ApplicationList extends AbstractApplicationList implements IAbstractApplicationList {
  protected _apps: Set<IAbstractApplication> = new Set<IAbstractApplication>().add(
    this._shipNextApplication
  );

  constructor(
    @inject(AppsSymbols.ShipNextApplication)
    private _shipNextApplication: IAbstractApplication
  ) {
    super();
  }
}
