import { Packages } from '@Packages';
const { ContainerModule } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { Initiator } from '../initiator';
import { MongodbConnector, ServiceConnector } from '../connectors';
import { FastifyFrameworkAdapter } from '../adapters/framework/fastify.framework.adapter';
import { FrameworkFactory } from '../factories/framework.factory';
import { BusinessAgent } from '../agents/business.agent';
import { ApplicationSchemaLoader } from '../loaders';
import { MongodbProvider } from '../providers/mongodb.provider';
import {
  DiscoveryService,
  GetawayService,
  LoggerService,
  AsyncStorageService,
  StreamService,
} from '../services';

import { Inversify } from '@Packages/Types';
import {
  IAbstractFactory,
  IAbstractFrameworkAdapter,
  IApplicationSchemaLoader,
  IAsyncStorageService,
  IBusinessAgent,
  IDiscoveryService,
  IGetawayService,
  IInitiator,
  ILoggerService,
  IMongodbConnector,
  IMongodbProvider,
  IServicesConnector,
  IStreamsService,
} from '@Core/Types';

export const CoreDefaultBinds = new ContainerModule((bind: Inversify.interfaces.Bind) => {
  // Initiator
  bind<IInitiator>(CoreSymbols.Initiator).to(Initiator).inRequestScope();

  // Connectors
  bind<IServicesConnector>(CoreSymbols.ServiceConnector).to(ServiceConnector).inSingletonScope();
  bind<IMongodbConnector>(CoreSymbols.MongoDBConnector).to(MongodbConnector).inSingletonScope();

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
  bind<IStreamsService>(CoreSymbols.StreamsService).to(StreamService).inSingletonScope();
  bind<IAsyncStorageService>(CoreSymbols.AsyncStorageService)
    .to(AsyncStorageService)
    .inSingletonScope();

  // Loaders
  bind<IApplicationSchemaLoader>(CoreSymbols.ApplicationSchemaLoader)
    .to(ApplicationSchemaLoader)
    .inSingletonScope();

  // Providers
  bind<IMongodbProvider>(CoreSymbols.MongodbProvider).to(MongodbProvider).inTransientScope();

  // Agents
  bind<IBusinessAgent>(CoreSymbols.BusinessAgent).to(BusinessAgent).inSingletonScope();
});
