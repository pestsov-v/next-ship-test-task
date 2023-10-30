import { Packages } from '@Packages';
const { Container } = Packages.inversify;

import { AppsModule } from './apps.ioc.module';

import { Inversify } from '@Packages/Types';
import { ShipNextContainer } from '../shipnext/ioc/ioc.shipnext.container';

const appsContainer = new Container({ defaultScope: 'Singleton' });
appsContainer.load(AppsModule);
const ioc: Inversify.interfaces.Container = Container.merge(appsContainer, ShipNextContainer);
export { ioc };
