import { Packages } from '@Packages';
import { ShipRateModule } from '../collections/ship-rate/ship.rate.ioc.module';
import { ShipDepartmentModule } from '../collections/ship-department/ship.department.ioc.module';
const { Container } = Packages.inversify;

const ShipNextContainer = new Container({ defaultScope: 'Singleton' });
ShipNextContainer.load(ShipRateModule, ShipDepartmentModule);

export { ShipNextContainer };
