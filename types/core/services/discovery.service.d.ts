import { IAbstractService } from './abstract.service';

export interface IDiscoveryService extends IAbstractService {
  getString(
    params: NDiscoveryService.ParamWithDefault<'string'>
  ): NDiscoveryService.EnvResult<'string'>;
  getNumber(
    params: NDiscoveryService.ParamWithDefault<'number'>
  ): NDiscoveryService.EnvResult<'number'>;
  getBoolean(
    params: NDiscoveryService.ParamWithDefault<'boolean'>
  ): NDiscoveryService.EnvResult<'boolean'>;
  getMandatory<T extends NDiscoveryService.EnvType>(name: string): NDiscoveryService.EnvResult<T>;
  getCertificateString(path: string): Promise<string>;
  getCertificateBuffer(path: string): Promise<Buffer>;
  getAppString(
    params: NDiscoveryService.ParamWithDefault<'string'>
  ): NDiscoveryService.EnvResult<'string'>;
}

export namespace NDiscoveryService {
  export type EnvType = 'string' | 'number' | 'boolean';

  export type ResolveEnvType<K extends EnvType> = K extends 'string'
    ? string
    : K extends 'number'
    ? number
    : K extends 'boolean'
    ? boolean
    : never;
  export type ParamWithDefault<K extends EnvType> = {
    readonly name: string;
    readonly def: ResolveEnvType<K>;
  };
  export type EnvResult<K extends EnvType> = ResolveEnvType<K>;
}
