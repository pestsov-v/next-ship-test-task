import { Packages } from '@Packages';
const { ContainerModule } = Packages.inversify;
import { ShipRateSymbols } from './ship.rate.ioc.symbols';
import { ShipRateCollector } from './ship.rate.collector';
import { ShipRateMongoRepository } from './ship.rate.mongo.repository';
import { ShipRateMongoSchema } from './ship.rate.mongo.schema';

import { IAbstractCollector, IAbstractMongoSchema } from '@Documents/Types';
import { Inversify } from '@Packages/Types';
import { NShipRate } from '@Apps/Types';

export const ShipRateModule = new ContainerModule((bind: Inversify.interfaces.Bind) => {
  bind<IAbstractCollector>(ShipRateSymbols.Collector).to(ShipRateCollector);
  bind<IAbstractMongoSchema>(ShipRateSymbols.MongoSchema).to(ShipRateMongoSchema);
  bind<NShipRate.IMongoRepository>(ShipRateSymbols.MongoRepository).to(ShipRateMongoRepository);
});
