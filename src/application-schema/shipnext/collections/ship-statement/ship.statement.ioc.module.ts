import { Packages } from '@Packages';
const { ContainerModule } = Packages.inversify;
import { ShipStatementSymbols } from './ship.statement.ioc.symbols';
import { ShipStatementCollector } from './ship.statement.collector';
import { ShipStatementMongoSchema } from './ship.statement.mongo.schema';
import { ShipStatementMongoRepository } from './ship.statement.mongo.repository';

import { Inversify } from '@Packages/Types';
import { NShipStatement } from '@Apps/Types';
import { IAbstractCollector, IAbstractMongoSchema } from '@Documents/Types';

export const ShipStatementModule = new ContainerModule((bind: Inversify.interfaces.Bind) => {
  bind<IAbstractCollector>(ShipStatementSymbols.Collector).to(ShipStatementCollector);
  bind<IAbstractMongoSchema>(ShipStatementSymbols.MongoSchema).to(ShipStatementMongoSchema);
  bind<NShipStatement.IMongoRepository>(ShipStatementSymbols.MongoRepository).to(
    ShipStatementMongoRepository
  );
});
