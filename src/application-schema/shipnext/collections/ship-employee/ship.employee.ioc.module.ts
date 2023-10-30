import { Packages } from '@Packages';
const { ContainerModule } = Packages.inversify;
import { ShipEmployeeSymbols } from './ship.employee.ioc.symbols';

import { ShipEmployeeCollector } from './ship.employee.collector';
import { ShipEmployeeMongoSchema } from './ship.employee.mongo.schema';
import { ShipEmployeeMongoRepository } from './ship.employee.mongo.repository';
import { ShipEmployeeController } from './ship.employee.controller';
import { ShipEmployeeRouter } from './ship.employee.router';

import { Inversify } from '@Packages/Types';
import { NShipEmployee } from '@Apps/Types';
import { IAbstractCollector, IAbstractMongoSchema, IAbstractRouter } from '@Documents/Types';

export const ShipEmployeeModule = new ContainerModule((bind: Inversify.interfaces.Bind) => {
  bind<IAbstractCollector>(ShipEmployeeSymbols.Collector).to(ShipEmployeeCollector);
  bind<NShipEmployee.IController>(ShipEmployeeSymbols.Controller).to(ShipEmployeeController);
  bind<IAbstractRouter>(ShipEmployeeSymbols.Router).to(ShipEmployeeRouter);
  bind<IAbstractMongoSchema>(ShipEmployeeSymbols.MongoSchema).to(ShipEmployeeMongoSchema);
  bind<NShipEmployee.IMongoRepository>(ShipEmployeeSymbols.MongoRepository).to(
    ShipEmployeeMongoRepository
  );
});
