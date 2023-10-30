import { Packages } from '@Packages';
const { Container } = Packages.inversify;

const ShipNextContainer = new Container({ defaultScope: 'Singleton' });

export { ShipNextContainer };
