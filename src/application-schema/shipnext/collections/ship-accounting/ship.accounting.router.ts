import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { ShipAccountingRouterPath } from './ship.accounting.router.path';
import { AbstractRouter } from '@Documents';

import { IAbstractRouter, NAbstractRouter } from '@Documents/Types';
import { ShipAccountingSymbols } from './ship.accounting.ioc.symbols';
import { NShipAccounting } from '@Apps/Types';

@injectable()
export class ShipAccountingRouter extends AbstractRouter implements IAbstractRouter {
  protected _paths = ShipAccountingRouterPath;

  constructor(
    @inject(ShipAccountingSymbols.Controller)
    private _shipAccountingController: NShipAccounting.IController
  ) {
    super();
  }

  protected _routes: NAbstractRouter.Routes = [
    {
      path: this._paths.SET_EMPLOYEE_ACCOUNTS,
      method: 'POST',
      handler: this._shipAccountingController.setEmployeeAccount,
      isPrivateUser: false,
      isPrivateOrganization: false,
      isStreamData: true,
      streamType: 'buffer',
    },
  ];
}
