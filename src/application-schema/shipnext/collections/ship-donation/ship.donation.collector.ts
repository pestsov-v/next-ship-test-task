import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { AbstractCollector } from '@Documents';
import { CollectionNames } from '../../common/collection-names';
import { ShipDonationSymbols } from './ship.donation.ioc.symbols';

import { IAbstractMongoSchema } from '@Documents/Types';

@injectable()
export class ShipDonationCollector extends AbstractCollector {
  protected readonly _COLLECTION_NAME = CollectionNames.SHIP_DONATION;
  protected _router = undefined;

  constructor(
    @inject(ShipDonationSymbols.MongoSchema)
    protected _mongoSchema: IAbstractMongoSchema
  ) {
    super();
  }
}
