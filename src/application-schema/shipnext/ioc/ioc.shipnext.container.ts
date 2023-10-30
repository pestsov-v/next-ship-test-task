import { Packages } from '@Packages';
import { ShipRateModule } from '../collections/ship-rate/ship.rate.ioc.module';
const { Container } = Packages.inversify;

const ShipNextContainer = new Container({ defaultScope: 'Singleton' });
ShipNextContainer.load(ShipRateModule);

export { ShipNextContainer };
