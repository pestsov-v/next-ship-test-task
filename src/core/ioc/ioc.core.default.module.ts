import { Packages } from '@Packages';
const { ContainerModule } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { Initiator } from '../initiator';
import { ServiceConnector } from '../connectors';

import { Inversify } from '@Packages/Types';
import { IInitiator, IServicesConnector } from '@Core/Types';

export const CoreDefaultBinds = new ContainerModule((bind: Inversify.interfaces.Bind) => {
  // Initiator
  bind<IInitiator>(CoreSymbols.Initiator).to(Initiator).inRequestScope();

  // Connectors
  bind<IServicesConnector>(CoreSymbols.ServiceConnector).to(ServiceConnector).inSingletonScope();
});
