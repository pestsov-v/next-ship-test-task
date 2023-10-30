import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { ShipEmployeeSymbols } from './ship.employee.ioc.symbols';

import { NShipAccounting, NShipEmployee } from '@Apps/Types';
import { NAbstractController } from '@Documents/Types';
import { ResponseType, StatusCode } from '@Common';

@injectable()
export class ShipEmployeeController implements NShipEmployee.IController {
  constructor(
    @inject(ShipEmployeeSymbols.MongoRepository)
    private _shipEmployeeMongoRepo: NShipEmployee.IMongoRepository
  ) {}

  public calculateEmployeeRemuneration = async (
    _: NAbstractController.Request<NShipAccounting.StreamBody>,
    agents: NAbstractController.Agents
  ): Promise<NAbstractController.Response> => {
    try {
      const remunerations = await this._shipEmployeeMongoRepo.calculateEmployeeRemuneration(agents);

      return {
        format: 'json',
        responseType: ResponseType.SUCCESS,
        status: StatusCode.SUCCESS,
        data: { remunerations },
      };
    } catch (e: any) {
      console.error(e);

      return {
        format: 'json',
        status: StatusCode.SERVER_ERROR,
        data: {
          message: e.message,
        },
      };
    }
  };
}
