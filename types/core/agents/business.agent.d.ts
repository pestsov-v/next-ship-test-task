import { NDiscoveryService, NLoggerService } from '../services';

export interface IBusinessAgent {
  readonly discovery: NBusinessAgent.Discovery;
  readonly logger: NBusinessAgent.Logger;
}

export namespace NBusinessAgent {
  export type Discovery = {
    getString: (
      params: NDiscoveryService.ParamWithDefault<'string'>
    ) => NDiscoveryService.EnvResult<'string'>;
  };

  export type Logger = {
    error: (error: NLoggerService.Error) => void;
    info: (msg: string) => void;
    debug: (msg: unknown) => void;
  };
}
