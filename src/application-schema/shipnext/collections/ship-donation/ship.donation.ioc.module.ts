import { Packages } from '@Packages';
const { ContainerModule } = Packages.inversify;
import { ShipDonationSymbols } from './ship.donation.ioc.symbols';
import { ShipDonationCollector } from './ship.donation.collector';
import { ShipDonationMongoRepository } from './ship.donation.mongo.repository';
import { ShipDonationMongoSchema } from './ship.donation.mongo.schema';

import { Inversify } from '@Packages/Types';
import { NShipDonation } from '@Apps/Types';
import { IAbstractCollector, IAbstractMongoSchema } from '@Documents/Types';

export const ShipDonationModule = new ContainerModule((bind: Inversify.interfaces.Bind) => {
  bind<IAbstractCollector>(ShipDonationSymbols.Collector).to(ShipDonationCollector);
  bind<IAbstractMongoSchema>(ShipDonationSymbols.MongoSchema).to(ShipDonationMongoSchema);
  bind<NShipDonation.IMongoRepository>(ShipDonationSymbols.MongoRepository).to(
    ShipDonationMongoRepository
  );
});
