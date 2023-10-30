import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { AbstractCollector } from '@Documents';
import { CollectionNames } from '../../common/collection-names';
import { ShipStatementSymbols } from './ship.statement.ioc.symbols';

import { IAbstractMongoSchema } from '@Documents/Types';

@injectable()
export class ShipStatementCollector extends AbstractCollector {
  protected readonly _COLLECTION_NAME = CollectionNames.SHIP_STATEMENT;
  protected _router = undefined;

  constructor(
    @inject(ShipStatementSymbols.MongoSchema)
    protected _mongoSchema: IAbstractMongoSchema
  ) {
    super();
  }
}
