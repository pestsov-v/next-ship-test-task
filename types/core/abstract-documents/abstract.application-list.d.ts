import { IApplicationSchemaLoader } from '@Core/Types';

export interface IAbstractApplicationList {
  setAppToSchema(loader: IApplicationSchemaLoader): void;
}
