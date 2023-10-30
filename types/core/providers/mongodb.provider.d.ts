import { Mongoose } from '@Packages/Types';
import { NApplicationSchemaLoader } from '../loaders';

export interface IMongodbProvider {
  setMongoModel(appSchemas: NApplicationSchemaLoader.CollectionMongoSchema[]): void;
  create<TRawDocType>(
    model: string,
    docs: Mongoose.Docs<TRawDocType>,
    options?: Mongoose.SaveOptions
  ): Promise<Mongoose.AnyKeys<TRawDocType>>;
  aggregate<TRowDocType>(
    model: string,
    details: NMongodbProvider.AggregateDetails
  ): Promise<Mongoose.AggregateResult<TRowDocType>>;
  insertMany<TRowDocType>(
    model: string,
    details: NMongodbProvider.InsertManyDetails<TRowDocType>
  ): Promise<Mongoose.InsertManyResult<TRowDocType>>;
}

export namespace NMongodbProvider {
  export type AggregateDetails = {
    pipeline: Mongoose.PipelineStage[];
    options?: Mongoose.AggregateOptions;
  };

  export type InsertManyDetails<TRawDocType> = {
    docs: Mongoose.Docs<TRawDocType>;
    options: Mongoose.InsertManyOptions;
  };
}
