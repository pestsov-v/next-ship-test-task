import { Packages } from '@Packages';
const { Container } = Packages.inversify;

import { ShipRateModule } from '../collections/ship-rate/ship.rate.ioc.module';
import { ShipDepartmentModule } from '../collections/ship-department/ship.department.ioc.module';
import { ShipDonationModule } from '../collections/ship-donation/ship.donation.ioc.module';
import { ShipStatementModule } from '../collections/ship-statement/ship.statement.ioc.module';
import { ShipAccountingModule } from '../collections/ship-accounting/ship.accounting.ioc.module';
import { ShipEmployeeModule } from '../collections/ship-employee/ship.employee.ioc.module';

const ShipNextContainer = new Container({ defaultScope: 'Singleton' });
ShipNextContainer.load(
  ShipRateModule,
  ShipDepartmentModule,
  ShipDonationModule,
  ShipStatementModule,
  ShipAccountingModule,
  ShipEmployeeModule
);

export { ShipNextContainer };
