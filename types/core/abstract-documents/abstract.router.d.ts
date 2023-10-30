import { IApplicationSchemaLoader, NApplicationSchemaLoader } from '@Core/Types';

export interface IAbstractRouter {
  setRoutes(application: string, collection: string, loader: IApplicationSchemaLoader): void;
}

export namespace NAbstractRouter {
  export type Paths = Record<string, string>;
  export type Routes = NApplicationSchemaLoader.CollectionRoute[];
}
