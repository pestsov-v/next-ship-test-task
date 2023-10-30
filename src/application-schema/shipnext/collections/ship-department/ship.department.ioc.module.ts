import { Packages } from '@Packages';
const { ContainerModule } = Packages.inversify;
import { ShipDepartmentSymbols } from './ship.department.ioc.symbols';
import { ShipDepartmentCollector } from './ship.department.collector';
import { ShipDepartmentMongoSchema } from './ship.department.mongo.schema';
import { ShipDepartmentMongoRepository } from './ship.department.mongo.repository';

import { Inversify } from '@Packages/Types';
import { IAbstractCollector, IAbstractMongoSchema } from '@Documents/Types';
import { NShipDepartment } from '@Apps/Types';

export const ShipDepartmentModule = new ContainerModule((bind: Inversify.interfaces.Bind) => {
  bind<IAbstractCollector>(ShipDepartmentSymbols.Collector).to(ShipDepartmentCollector);
  bind<IAbstractMongoSchema>(ShipDepartmentSymbols.MongoSchema).to(ShipDepartmentMongoSchema);
  bind<NShipDepartment.IMongoRepository>(ShipDepartmentSymbols.MongoRepository).to(
    ShipDepartmentMongoRepository
  );
});
