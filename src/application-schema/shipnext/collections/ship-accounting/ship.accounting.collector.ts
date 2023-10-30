import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { AbstractCollector, AbstractRouter } from '@Documents';

import { CollectionNames } from '../../common/collection-names';
import { ShipAccountingSymbols } from './ship.accounting.ioc.symbols';

@injectable()
export class ShipAccountingCollector extends AbstractCollector {
  protected readonly _COLLECTION_NAME = CollectionNames.SHIP_ACCOUNTING;
  protected _mongoSchema = undefined;

  constructor(
    @inject(ShipAccountingSymbols.Router)
    protected _router: AbstractRouter
  ) {
    super();
  }
}
