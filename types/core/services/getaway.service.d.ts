import { IAbstractService } from './abstract.service';

export interface IGetawayService extends IAbstractService {}

export namespace NGetawayService {
  export type Config = {
    appsPath: string;
  };
}
