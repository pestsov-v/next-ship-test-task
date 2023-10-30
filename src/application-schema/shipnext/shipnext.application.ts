import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { ApplicationNames } from '../common/application-names';
import { AbstractApplication } from '@Documents';

import {
  ShipRateSymbols,
  ShipDepartmentSymbols,
  ShipDonationSymbols,
  ShipStatementSymbols,
} from './collections/collections.ioc.symbols';

import { IAbstractCollector } from '@Documents/Types';

@injectable()
export class ShipNextApplication extends AbstractApplication {
  protected _APPLICATION_NAME = ApplicationNames.SHIP_NEXT;
  protected readonly _collectors: Set<IAbstractCollector> = new Set<IAbstractCollector>()
    .add(this._shipRateCollector)
    .add(this._shipDepartmentCollector)
    .add(this._shipDonationCollector)
    .add(this._shipStatementCollector);

  constructor(
    @inject(ShipRateSymbols.Collector)
    private _shipRateCollector: IAbstractCollector,
    @inject(ShipDepartmentSymbols.Collector)
    private _shipDepartmentCollector: IAbstractCollector,
    @inject(ShipDonationSymbols.Collector)
    private _shipDonationCollector: IAbstractCollector,
    @inject(ShipStatementSymbols.Collector)
    private _shipStatementCollector: IAbstractCollector
  ) {
    super();
  }
}
