import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { ApplicationNames } from '../common/application-names';
import { ShipRateSymbols, ShipDepartmentSymbols } from './collections/collections.ioc.symbols';
import { AbstractApplication } from '@Documents';

import { IAbstractCollector } from '@Documents/Types';

@injectable()
export class ShipNextApplication extends AbstractApplication {
  protected _APPLICATION_NAME = ApplicationNames.SHIP_NEXT;
  protected readonly _collectors: Set<IAbstractCollector> = new Set<IAbstractCollector>()
    .add(this._shipRateCollector)
    .add(this._shipDepartmentCollector);

  constructor(
    @inject(ShipRateSymbols.Collector)
    private _shipRateCollector: IAbstractCollector,
    @inject(ShipDepartmentSymbols.Collector)
    private _shipDepartmentCollector: IAbstractCollector
  ) {
    super();
  }
}
