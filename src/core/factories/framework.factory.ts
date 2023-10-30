import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { AbstractFactory } from './abstract.factory';

import {
  IAbstractFactory,
  IAbstractFrameworkAdapter,
  IDiscoveryService,
  ILoggerService,
  NAbstractFrameworkAdapter,
} from '@Core/Types';
import { CoreSymbols } from '@CoreSymbols';
import { Helpers } from '../utils/helpers';

@injectable()
export class FrameworkFactory extends AbstractFactory implements IAbstractFactory {
  protected readonly _FACTORY_NAME = FrameworkFactory.name;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected _loggerService: ILoggerService,
    @inject(CoreSymbols.FastifyFrameworkAdapter)
    private _fastifyFrameworkAdapter: IAbstractFrameworkAdapter
  ) {
    super();
  }

  protected async run(): Promise<void> {
    const frameworkKind = this._discoveryService.getString({
      name: 'api:framework',
      def: 'fastify',
    });

    const kind = frameworkKind as NAbstractFrameworkAdapter.FrameworkKind;
    switch (kind) {
      case 'fastify':
        await this._fastifyFrameworkAdapter.start();
        break;
      default:
        const kinds: NAbstractFrameworkAdapter.FrameworkKind[] = ['fastify'];
        throw Helpers.switchChecker(kind, kinds);
    }
  }
}
