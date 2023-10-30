import { IApplicationSchemaLoader, NAbstractFrameworkAdapter } from '@Core/Types';
import mongoose, { SchemaDefinition, SchemaOptions } from 'mongoose';

export interface IAbstractMongoSchema {
  setMongoSchema(application: string, collection: string, loader: IApplicationSchemaLoader): void;
}

export namespace NAbstractMongoSchema {
  export type Agents = NAbstractFrameworkAdapter.Agents;

  export type MongooseSchema<T = mongoose.Document> = {
    schema: SchemaDefinition<T>;
    options?: SchemaOptions;
  };
}
