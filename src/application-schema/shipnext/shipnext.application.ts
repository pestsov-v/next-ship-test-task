import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { ApplicationNames } from '../common/application-names';
import { AbstractApplication } from '@Documents';

import { IAbstractCollector } from '@Documents/Types';
import { ShipRateSymbols } from './collections/ship-rate/ship.rate.ioc.symbols';

@injectable()
export class ShipNextApplication extends AbstractApplication {
  protected _APPLICATION_NAME = ApplicationNames.SHIP_NEXT;
  protected readonly _collectors: Set<IAbstractCollector> = new Set<IAbstractCollector>().add(
    this._shipRateCollector
  );

  constructor(
    @inject(ShipRateSymbols.Collector)
    private _shipRateCollector: IAbstractCollector
  ) {
    super();
  }
}
