import { Packages } from '@Packages';
const { injectable } = Packages.inversify;

import { IAbstractConnector } from '@Core/Types';

@injectable()
export abstract class AbstractConnector implements IAbstractConnector {
  public abstract start(): Promise<void>;
  public abstract stop(): Promise<void>;
}
