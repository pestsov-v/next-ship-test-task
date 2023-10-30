import { IApplicationSchemaLoader } from '@Core/Types';

export interface IAbstractCollector {
  setAppToSchema(application: string, loader: IApplicationSchemaLoader): void;
}
