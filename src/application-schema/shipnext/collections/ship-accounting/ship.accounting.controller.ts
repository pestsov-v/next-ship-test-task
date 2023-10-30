import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;

import {
  NShipAccounting,
  NShipDepartment,
  NShipDonation,
  NShipRate,
  NShipStatement,
} from '@Apps/Types';
import { NAbstractController } from '@Documents/Types';
import { ShipAccountingSymbols } from './ship.accounting.ioc.symbols';
import { ShipDepartmentSymbols } from '../ship-department/ship.department.ioc.symbols';
import { ShipDonationSymbols } from '../ship-donation/ship.donation.ioc.symbols';
import { ShipRateSymbols } from '../ship-rate/ship.rate.ioc.symbols';
import { ShipStatementSymbols } from '../ship-statement/ship.statement.ioc.symbols';

@injectable()
export class ShipAccountingController implements NShipAccounting.IController {
  constructor(
    @inject(ShipAccountingSymbols.Helper)
    private _shipAccountingHelper: NShipAccounting.IHelper,
    @inject(ShipDepartmentSymbols.MongoRepository)
    private _shipDepartmentMongoRepo: NShipDepartment.IMongoRepository,
    @inject(ShipDonationSymbols.MongoRepository)
    private _shipDonationMongoRepo: NShipDonation.IMongoRepository,
    @inject(ShipRateSymbols.MongoRepository)
    private _shipRateMongoRepo: NShipRate.IMongoRepository,
    @inject(ShipStatementSymbols.MongoRepository)
    private _shipStatementMongoRepo: NShipStatement.IMongoRepository
  ) {}

  public setEmployeeAccount = async (
    req: NAbstractController.Request<NShipAccounting.StreamBody>,
    agents: NAbstractController.Agents
  ): Promise<NAbstractController.Response> => {};
}
