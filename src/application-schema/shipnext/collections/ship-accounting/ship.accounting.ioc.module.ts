import { Packages } from '@Packages';
const { ContainerModule } = Packages.inversify;
import { ShipAccountingSymbols } from './ship.accounting.ioc.symbols';
import { ShipAccountingCollector } from './ship.accounting.collector';
import { ShipAccountingRouter } from './ship.accounting.router';
import { ShipAccountingController } from './ship.accounting.controller';
import { ShipAccountingHelper } from './ship.accounting.helper';

import { Inversify } from '@Packages/Types';
import { NShipAccounting } from '@Apps/Types';
import { IAbstractCollector, IAbstractRouter } from '@Documents/Types';

export const ShipAccountingModule = new ContainerModule((bind: Inversify.interfaces.Bind) => {
  bind<IAbstractCollector>(ShipAccountingSymbols.Collector).to(ShipAccountingCollector);
  bind<IAbstractRouter>(ShipAccountingSymbols.Router).to(ShipAccountingRouter);
  bind<NShipAccounting.IController>(ShipAccountingSymbols.Controller).to(ShipAccountingController);
  bind<NShipAccounting.IHelper>(ShipAccountingSymbols.Helper).to(ShipAccountingHelper);
});
