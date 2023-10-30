import { Packages } from '@Packages';
import { IDiscoveryService, ILoggerService } from '@Core/Types';
const { injectable } = Packages.inversify;

@injectable()
export abstract class AbstractFactory {
  protected abstract _FACTORY_NAME: string;
  protected abstract _loggerService: ILoggerService;
  protected abstract _discoveryService: IDiscoveryService;

  protected abstract run(): Promise<void>;

  public async start(): Promise<void> {
    try {
      await this.run();
    } catch (e) {
      throw e;
    }
  }
}
