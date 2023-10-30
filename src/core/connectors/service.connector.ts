import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { AbstractConnector } from './abstract.connector';

import { IServicesConnector } from '@Core/Types';

@injectable()
export class ServiceConnector extends AbstractConnector implements IServicesConnector {
  constructor() {
    super();
  }

  public async start(): Promise<void> {}

  public async stop(): Promise<void> {}
}
