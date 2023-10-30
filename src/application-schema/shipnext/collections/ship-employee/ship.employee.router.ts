import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { AbstractRouter } from '@Documents';
import { ShipEmployeeSymbols } from './ship.employee.ioc.symbols';
import { ShipEmployeeRouterPath } from './ship.employee.router.path';

import { NShipEmployee } from '@Apps/Types';
import { IAbstractRouter, NAbstractRouter } from '@Documents/Types';

@injectable()
export class ShipEmployeeRouter extends AbstractRouter implements IAbstractRouter {
  protected _paths = ShipEmployeeRouterPath;

  constructor(
    @inject(ShipEmployeeSymbols.Controller)
    private _shipEmployeeController: NShipEmployee.IController
  ) {
    super();
  }

  protected _routes: NAbstractRouter.Routes = [
    {
      isStreamData: false,
      path: this._paths.GET_EMPLOYEES_SALARIES,
      method: 'GET',
      handler: this._shipEmployeeController.calculateEmployeeRemuneration,
      isPrivateUser: false,
      isPrivateOrganization: false,
    },
  ];
}
