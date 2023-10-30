import 'reflect-metadata';
import { Packages } from '@Packages';
const { Container } = Packages.inversify;

import { CoreDefaultBinds } from './ioc.core.default.module';

const container = new Container();

container.load(CoreDefaultBinds);

export { container };
