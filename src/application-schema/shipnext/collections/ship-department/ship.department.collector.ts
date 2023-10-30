import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { AbstractCollector } from '@Documents';

import { CollectionNames } from '../../common/collection-names';
import { ShipDepartmentSymbols } from './ship.department.ioc.symbols';
import { IAbstractMongoSchema } from '@Documents/Types';

@injectable()
export class ShipDepartmentCollector extends AbstractCollector {
  protected readonly _COLLECTION_NAME = CollectionNames.SHIP_DEPARTMENT;
  protected _router = undefined;

  constructor(
    @inject(ShipDepartmentSymbols.MongoSchema)
    protected _mongoSchema: IAbstractMongoSchema
  ) {
    super();
  }
}
