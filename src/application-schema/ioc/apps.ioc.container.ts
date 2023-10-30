import { Packages } from '@Packages';
const { Container } = Packages.inversify;

import { AppsModule } from './apps.ioc.module';

const appsContainer = new Container({ defaultScope: 'Singleton' });
appsContainer.load(AppsModule);
export { appsContainer };
