import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { AbstractCollector } from '@Documents';
import { CollectionNames } from '../../common/collection-names';
import { ShipEmployeeSymbols } from './ship.employee.ioc.symbols';

import { IAbstractMongoSchema, IAbstractRouter } from '@Documents/Types';

@injectable()
export class ShipEmployeeCollector extends AbstractCollector {
  protected readonly _COLLECTION_NAME = CollectionNames.SHIP_EMPLOYEE;

  constructor(
    @inject(ShipEmployeeSymbols.Router)
    protected _router: IAbstractRouter,
    @inject(ShipEmployeeSymbols.MongoSchema)
    protected _mongoSchema: IAbstractMongoSchema
  ) {
    super();
  }
}
