import { Packages } from '@Packages';
const { ContainerModule } = Packages.inversify;
import { AppsSymbols } from './apps.ioc.symbols';
import { ApplicationList } from '../application-list';

import { Inversify } from '@Packages/Types';
import { IAbstractApplication, IAbstractApplicationList } from '@Documents/Types';

export const AppsModule = new ContainerModule((bind: Inversify.interfaces.Bind) => {
  // Application list
  bind<IAbstractApplicationList>(AppsSymbols.ApplicationList).to(ApplicationList);
});
