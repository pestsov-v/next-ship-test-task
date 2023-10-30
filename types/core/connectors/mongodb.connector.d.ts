import { IAbstractConnector } from './abstract.connector';
import { Mongoose } from '@Packages/Types';

export interface IMongodbConnector extends IAbstractConnector {
  readonly connection: Mongoose.Mongoose;
}

export namespace NMongodbConnector {
  export type Config = {
    enable: boolean;
    protocol: string;
    host: string;
    port: number;
    database: string;
    auth: {
      username: string;
      password: string;
    };
  };
}
