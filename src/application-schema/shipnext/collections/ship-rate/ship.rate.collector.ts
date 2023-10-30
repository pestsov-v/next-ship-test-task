import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { AbstractCollector } from '@Documents';
import { CollectionNames } from '../../common/collection-names';
import { ShipRateSymbols } from './ship.rate.ioc.symbols';

import { IAbstractMongoSchema } from '@Documents/Types';

@injectable()
export class ShipRateCollector extends AbstractCollector {
  protected readonly _COLLECTION_NAME = CollectionNames.SHIP_RATE;
  protected _router = undefined;

  constructor(
    @inject(ShipRateSymbols.MongoSchema)
    protected _mongoSchema: IAbstractMongoSchema
  ) {
    super();
  }
}
