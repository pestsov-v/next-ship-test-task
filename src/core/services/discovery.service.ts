import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
const { nconf } = Packages.nconf;
const { os } = Packages.os;
const { path } = Packages.path;
const { pfs } = Packages.fs;
import { AbstractService } from './abstract.service';

import { Nconf } from '@Packages/Types';
import { IDiscoveryService, NDiscoveryService } from '@Core/Types';

@injectable()
export class DiscoveryService extends AbstractService implements IDiscoveryService {
  protected _SERVICE_NAME = DiscoveryService.name;

  private _nconf: Nconf.Provider | undefined;
  protected _discoveryService = this;

  protected async init(): Promise<boolean> {
    this._nconf = nconf;
    await this._setEnvConfigurations();

    return true;
  }

  protected async _setEnvConfigurations(): Promise<void> {
    if (!this._nconf) {
      throw new Error('nconf provider not initialize');
    }

    const processdir = process.cwd();
    const homedir = os.homedir();

    const appMode = process.env.APPLICATION_MODE ?? 'dev';
    const profile = process.env.APPLICATION_PROFILE ?? 'default';
    const processPath = path.join(processdir, `/configs`);

    const defaults: { [key: string]: undefined } = {};

    const files = await pfs.readdir(processPath);

    for (const file of files) {
      const filePath = processPath + '/' + file;
      const [module, mode] = file.split('.');

      if (path.extname(filePath) !== '.json') return;
      if (mode !== appMode) return;

      try {
        const config = await pfs.readFile(filePath, 'utf-8');
        defaults[module] = JSON.parse(config);
      } catch (e) {
        throw new Error('Invalid JSON payload format');
      }
    }

    this._nconf.defaults(defaults);
  }

  protected async destroy(): Promise<void> {
    if (!this._nconf) return;

    this._nconf.reset();
  }

  public getAppString(
    params: NDiscoveryService.ParamWithDefault<'string'>
  ): NDiscoveryService.EnvResult<'string'> {
    return this.getString({ name: 'applications:' + params.name, def: params.def });
  }

  public getString(
    params: NDiscoveryService.ParamWithDefault<'string'>
  ): NDiscoveryService.EnvResult<'string'> {
    const variable = this._get(params.name, params.def);
    if (typeof variable !== 'string') {
      try {
        return String(variable);
      } catch {
        return params.def;
      }
    }
    return variable;
  }

  public getNumber(
    params: NDiscoveryService.ParamWithDefault<'number'>
  ): NDiscoveryService.EnvResult<'number'> {
    const variable = this._get(params.name, params.def);

    if (typeof variable !== 'number') {
      try {
        return Number(variable);
      } catch {
        return params.def;
      }
    }
    return variable;
  }

  public getBoolean(
    params: NDiscoveryService.ParamWithDefault<'boolean'>
  ): NDiscoveryService.EnvResult<'boolean'> {
    const variable = this._get(params.name, params.def);
    if (variable !== false && variable !== true) {
      return params.def;
    }
    return variable;
  }

  public getMandatory<T extends NDiscoveryService.EnvType>(
    name: string
  ): NDiscoveryService.EnvResult<T> {
    const variable = this._get<T>(name);
    if (variable) {
      return variable;
    } else {
      throw new Error('Environment variable not found');
    }
  }

  private _get<T extends NDiscoveryService.EnvType>(
    name: string,
    def?: unknown
  ): NDiscoveryService.EnvResult<T> {
    if (!this._nconf) {
      throw new Error('nconf provider not initialize');
    }
    const variable = this._nconf.get(name);
    return variable === '' || variable === undefined ? def : variable;
  }

  public async getCertificateString(path: string): Promise<string> {
    // TODO: implement `getCertificateString` method
    throw new Error('Method not implement');
  }

  public async getCertificateBuffer(path: string): Promise<Buffer> {
    // TODO: implement `getCertificateString` method
    throw new Error('Method not implement');
  }
}
