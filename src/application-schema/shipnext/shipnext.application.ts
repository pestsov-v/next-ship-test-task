import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { ApplicationNames } from '../common/application-names';
import { AbstractApplication } from '@Documents';
import {
  ShipAccountingSymbols,
  ShipDepartmentSymbols,
  ShipDonationSymbols,
  ShipEmployeeSymbols,
  ShipRateSymbols,
  ShipStatementSymbols,
} from './collections/collections.ioc.symbols';

import { IAbstractCollector } from '@Documents/Types';

@injectable()
export class ShipNextApplication extends AbstractApplication {
  protected _APPLICATION_NAME = ApplicationNames.SHIP_NEXT;
  protected readonly _collectors: Set<IAbstractCollector> = new Set<IAbstractCollector>()
    .add(this._shipDepartmentCollector)
    .add(this._shipDonationCollector)
    .add(this._shipEmployeeCollector)
    .add(this._shipRateCollector)
    .add(this._shipStatementCollector)
    .add(this._shipAccountingCollector);

  constructor(
    @inject(ShipDepartmentSymbols.Collector)
    private _shipDepartmentCollector: IAbstractCollector,
    @inject(ShipDonationSymbols.Collector)
    private _shipDonationCollector: IAbstractCollector,
    @inject(ShipEmployeeSymbols.Collector)
    private _shipEmployeeCollector: IAbstractCollector,
    @inject(ShipRateSymbols.Collector)
    private _shipRateCollector: IAbstractCollector,
    @inject(ShipStatementSymbols.Collector)
    private _shipStatementCollector: IAbstractCollector,
    @inject(ShipAccountingSymbols.Collector)
    private _shipAccountingCollector: IAbstractCollector
  ) {
    super();
  }
}
