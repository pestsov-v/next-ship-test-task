import inversify from 'inversify';
import nconf from 'nconf';

export namespace Inversify {
  export namespace interfaces {
    export type Bind = inversify.interfaces.Bind;
    export type Container = inversify.interfaces.Container;
  }
}

export namespace Nconf {
  export type Provider = nconf.Provider;
}
