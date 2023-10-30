import { Packages } from '@Packages';
const { ContainerModule } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { Initiator } from '../initiator';
import { ServiceConnector } from '../connectors';
import { DiscoveryService, GetawayService, LoggerService, AsyncStorageService } from '../services';
import { FastifyFrameworkAdapter } from '../adapters/framework/fastify.framework.adapter';
import { FrameworkFactory } from '../factories/framework.factory';

import { Inversify } from '@Packages/Types';
import {
  IAbstractFactory,
  IAbstractFrameworkAdapter,
  IAsyncStorageService,
  IBusinessAgent,
  IDiscoveryService,
  IGetawayService,
  IInitiator,
  ILoggerService,
  IServicesConnector,
} from '@Core/Types';

export const CoreDefaultBinds = new ContainerModule((bind: Inversify.interfaces.Bind) => {
  // Initiator
  bind<IInitiator>(CoreSymbols.Initiator).to(Initiator).inRequestScope();

  // Connectors
  bind<IServicesConnector>(CoreSymbols.ServiceConnector).to(ServiceConnector).inSingletonScope();

  // Framework adapters
  bind<IAbstractFrameworkAdapter>(CoreSymbols.FastifyFrameworkAdapter)
    .to(FastifyFrameworkAdapter)
    .inSingletonScope();

  // Factories
  bind<IAbstractFactory>(CoreSymbols.FrameworkFactory).to(FrameworkFactory).inSingletonScope();

  // Services
  bind<IDiscoveryService>(CoreSymbols.DiscoveryService).to(DiscoveryService).inSingletonScope();
  bind<ILoggerService>(CoreSymbols.LoggerService).to(LoggerService).inSingletonScope();
  bind<IGetawayService>(CoreSymbols.GetawayService).to(GetawayService).inSingletonScope();
  bind<IAsyncStorageService>(CoreSymbols.AsyncStorageService)
    .to(AsyncStorageService)
    .inSingletonScope();
});
