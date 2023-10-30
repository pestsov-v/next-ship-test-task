import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { ShipEmployeeSymbols } from './ship.employee.ioc.symbols';

import { NShipAccounting, NShipEmployee } from '@Apps/Types';
import { NAbstractController } from '@Documents/Types';

@injectable()
export class ShipEmployeeController implements NShipEmployee.IController {
  constructor(
    @inject(ShipEmployeeSymbols.MongoRepository)
    private _shipEmployeeMongoRepo: NShipEmployee.IMongoRepository
  ) {}

  public getEmployeesSalaries = async (
    _: NAbstractController.Request<NShipAccounting.StreamBody>,
    agents: NAbstractController.Agents
  ): Promise<NAbstractController.Response> => {};
}
