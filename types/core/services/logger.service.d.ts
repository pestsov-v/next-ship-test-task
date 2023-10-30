import { IAbstractService } from './abstract.service';
import { UUID } from '@Utility';

export interface ILoggerService extends IAbstractService {
  error(error: NLoggerService.Error, options?: NLoggerService.ErrorOptions): void;
  warn(msg: string): void;
  schema(options: NLoggerService.SchemaOptions): void;
  appError(error: NLoggerService.Error, options: NLoggerService.AppErrorOptions): void;
  appInfo(msg: string, options: NLoggerService.AppBaseOptions): void;
  appDebug(msg: unknown): void;
}

export namespace NLoggerService {
  export type LoggerTypes = {
    core: 'CoreLogger';
    schema: 'SchemaLogger';
  };

  export type LoggerStrLevel = 'error' | 'warn' | 'schema' | 'system' | 'info' | 'debug';

  export type LoggerLevels = {
    core: {
      error: 0;
      warn: 1;
      schema: 2;
    };
    schema: {
      error: 0;
      info: 1;
      debug: 2;
    };
  };

  export type LoggerColors = {
    error: 'bold red';
    warning: 'yellow';
    schema: 'green';
  };

  export type Config = {
    loggers: {
      core: boolean;
      schema: boolean;
    };
    transports: {
      console: {
        enable: boolean;
        level: string;
      };
    };
  };

  export type Error = any;
  export type ExecuteTag = 'Executor' | 'Runner' | 'Config';

  export type BaseOptions = {
    executeTag: ExecuteTag;
    moduleName: string;
  };

  export type SchemaOptions = BaseOptions & {
    useragent: string;
    path: string;
    method: string;
    requestId: string;
    ip: string;
    resultStatusCode?: TStatusCode;
    resultStatusMessage?: TResponseType;
  };

  export interface BaseErrorOptions {
    type: keyof LoggerTypes;
  }

  export interface AppBaseOptions {
    requestId: UUID;
    application: string;
    collection: string;
    action: string;
    version: string;
    method: string;
  }

  export interface ErrorOptions extends BaseErrorOptions, BaseOptions {
    type: 'core';
    requestId?: UUID;
  }

  export interface AppErrorOptions extends BaseErrorOptions, AppBaseOptions {
    type: 'schema';
  }
}
