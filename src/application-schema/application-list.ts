import { Packages } from '@Packages';
const { injectable } = Packages.inversify;

import { AbstractApplicationList } from '@Documents';
import { IAbstractApplication, IAbstractApplicationList } from '@Documents/Types';

@injectable()
export class ApplicationList extends AbstractApplicationList implements IAbstractApplicationList {
  protected _apps: Set<IAbstractApplication> = new Set<IAbstractApplication>();

  constructor() {
    super();
  }
}
