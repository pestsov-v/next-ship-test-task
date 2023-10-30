import { ioc } from './ioc/apps.ioc.container';
import { IAbstractApplicationList } from '@Documents/Types';
import { AppsSymbols } from './ioc/apps.ioc.symbols';

const apps = ioc.get<IAbstractApplicationList>(AppsSymbols.ApplicationList);
export { apps, ioc };
