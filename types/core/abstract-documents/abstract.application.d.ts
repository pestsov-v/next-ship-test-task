import { IApplicationSchemaLoader } from '@Core/Types';

export interface IAbstractApplication {
  setAppToSchema(loader: IApplicationSchemaLoader): void;
}
