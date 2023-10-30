import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { ApplicationNames } from '../common/application-names';
import { AbstractApplication } from '@Documents';

import { IAbstractCollector } from '@Documents/Types';

@injectable()
export class ShipNextApplication extends AbstractApplication {
  protected _APPLICATION_NAME = ApplicationNames.SHIP_NEXT;
  protected readonly _collectors: Set<IAbstractCollector> = new Set<IAbstractCollector>();

  constructor() {
    super();
  }
}
