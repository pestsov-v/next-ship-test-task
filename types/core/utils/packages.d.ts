import inversify from 'inversify';
import nconf from 'nconf';
import winston from 'winston';
import colors from 'colors';

export namespace Inversify {
  export namespace interfaces {
    export type Bind = inversify.interfaces.Bind;
    export type Container = inversify.interfaces.Container;
  }
}

export namespace Nconf {
  export type Provider = nconf.Provider;
}

export namespace Winston {
  export type Container = winston.Container;
  export type Logger = winston.Logger;
}

export namespace Color {
  export type Color = colors.Color;
}
