import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { Container, format, transports } = Packages.winston;
const { colors } = Packages.colors;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractService } from './abstract.service';

import { IDiscoveryService, ILoggerService, NLoggerService } from '@Core/Types';
import { Color, Winston } from '@Packages/Types';
import { Helpers } from '../utils/helpers';

@injectable()
export class LoggerService extends AbstractService implements ILoggerService {
  protected readonly _SERVICE_NAME = LoggerService.name;
  protected _loggerService = this;
  private _config: NLoggerService.Config | undefined;
  private _container: Winston.Container | undefined;
  private _loggers: Partial<Record<keyof NLoggerService.LoggerTypes, Winston.Logger>> = {};

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected _discoveryService: IDiscoveryService
  ) {
    super();
  }

  private readonly _LOGGER_TYPES: NLoggerService.LoggerTypes = {
    core: 'CoreLogger',
    schema: 'SchemaLogger',
  };

  private readonly _CORE_LOGGER_LEVELS: NLoggerService.LoggerLevels['core'] = {
    error: 0,
    warn: 1,
    schema: 2,
  };

  private readonly _SCHEMA_LOGGER_LEVELS: NLoggerService.LoggerLevels['schema'] = {
    error: 0,
    info: 1,
    debug: 2,
  };

  private readonly _LOGGER_COLORS: NLoggerService.LoggerColors = {
    error: 'bold red',
    warning: 'yellow',
    schema: 'green',
  };

  private _setConfig() {
    this._config = {
      loggers: {
        core: this._discoveryService.getBoolean({ name: 'services:logger:core:enable', def: true }),
        schema: this._discoveryService.getBoolean({
          name: 'services:logger:schema:enable',
          def: true,
        }),
      },
      transports: {
        console: {
          enable: this._discoveryService.getBoolean({
            name: 'services:logger:transports:console:enable',
            def: true,
          }),
          level: this._discoveryService.getString({
            name: 'services:logger:transports:console:level',
            def: 'schema',
          }),
        },
      },
    };
  }

  protected async init(): Promise<boolean> {
    this._setConfig();

    if (!this._config) {
      throw new Error('Config not initialize');
    }

    this._container = new Container();

    if (this._config.loggers.core) {
      this._container.add(this._LOGGER_TYPES.core, {
        levels: this._CORE_LOGGER_LEVELS,
        transports: [this._consoleTransport],
      });
      this._loggers.core = this._container.get(this._LOGGER_TYPES.core);
    }

    if (this._config.loggers.schema) {
      this._container.add(this._LOGGER_TYPES.schema, {
        levels: this._SCHEMA_LOGGER_LEVELS,
        transports: [this._consoleTransport],
      });
      this._loggers.schema = this._container.get(this._LOGGER_TYPES.schema);
    }

    return Object.keys(this._loggers).length > 0;
  }

  protected async destroy(): Promise<void> {
    if (this._loggers.core) this._loggers.core.destroy();
    if (this._loggers.schema) this._loggers.schema.destroy();
  }

  public error(error: NLoggerService.Error, options?: NLoggerService.ErrorOptions): void {
    if (this._loggers.core) {
      this._loggers.core.log('error', { error, options });
    }
  }

  public warn(msg: string): void {
    if (this._loggers.core) {
      this._loggers.core.log('warn', msg);
    }
  }

  public schema(options: NLoggerService.SchemaOptions): void {
    if (this._loggers.core) {
      this._loggers.core.log('schema', options);
    }
  }

  public appInfo(msg: string, options: NLoggerService.AppBaseOptions): void {
    if (this._loggers.schema) {
      this._loggers.schema.log('info', { msg, options });
    }
  }

  public appError(error: NLoggerService.Error, options: NLoggerService.AppErrorOptions) {
    if (this._loggers.schema) {
      this._loggers.schema.log('error', { error, options });
    }
  }

  public appDebug(msg: unknown): void {
    if (this._loggers.schema) {
      this._loggers.schema.log('debug', msg);
    }
  }

  private get _consoleTransport() {
    if (!this._config) {
      throw new Error('Config not initialize');
    }

    return new transports.Console({
      level: this._config.transports.console.level,
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf((info) => {
          const levels = info.level as NLoggerService.LoggerStrLevel;
          const timestamp = info.timestamp;

          let namespace: string;
          if (info.namespace) {
            namespace = this.addBrackets(this._centralized(20, info.namespace));
          } else {
            namespace = ' ';
          }
          let str = timestamp + namespace;

          switch (levels) {
            // TODO: parse and realise structure of logger levels
            case 'error':
            case 'warn':
            case 'system':
            case 'info':
            case 'debug':
            case 'schema':
              console.log(info);
              let str = '';
              break;
            default:
              const kinds: NLoggerService.LoggerStrLevel[] = [
                'error',
                'warn',
                'system',
                'info',
                'schema',
                'debug',
              ];
              throw Helpers.switchChecker(levels, kinds);
          }

          return info.message;
        }),
        format.colorize({
          all: true,
        })
      ),
    });
  }

  private addBrackets(str: string): string {
    return ' [ ' + str + ' ] ';
  }

  private addLevel(level: string, bg: keyof Color.Color, color: keyof Color.Color) {
    const spacesToAdd = 11 - level.length;

    const leftSpaces = Math.floor(spacesToAdd / 2);
    const rightSpaces = spacesToAdd - leftSpaces;

    return colors[bg][color](
      ' '.repeat(leftSpaces) + level.toUpperCase() + ' '.repeat(rightSpaces)
    );
  }

  private _centralized(maxLength: number, str: string): string {
    const spacesToAdd = maxLength - str.length;

    const leftSpaces = Math.floor(spacesToAdd / 2);
    const rightSpaces = spacesToAdd - leftSpaces;

    return ' '.repeat(leftSpaces) + str + ' '.repeat(rightSpaces);
  }
}
