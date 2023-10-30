import { NDiscoveryService, NLoggerService, NStreamsService } from '../services';

import { NMongodbProvider } from '../providers';
import { Mongoose } from '@Packages/Types';
import { Nullable, UUID } from '@Utility/Types';

export interface IBusinessAgent {
  readonly discovery: NBusinessAgent.Discovery;
  readonly logger: NBusinessAgent.Logger;
  readonly mongoose: NBusinessAgent.Mongoose;
  readonly streams: NBusinessAgent.Streams;
}

export namespace NBusinessAgent {
  export type Discovery = {
    getString: (
      params: NDiscoveryService.ParamWithDefault<'string'>
    ) => NDiscoveryService.EnvResult<'string'>;
  };

  export type Logger = {
    error: (error: NLoggerService.Error) => void;
    info: (msg: string) => void;
    debug: (msg: unknown) => void;
  };

  export type Mongoose = {
    create<TRawDocType>(
      model: string,
      docs: Mongoose.Docs<TRawDocType>,
      options?: Mongoose.SaveOptions
    ): Promise<Mongoose.AnyKeys<TRawDocType>>;
    aggregate: <TRowDocType>(
      model: string,
      details: NMongodbProvider.AggregateDetails
    ) => Promise<Mongoose.AggregateResult<TRowDocType>>;
    insertMany: <TRowDocType>(
      model: string,
      details: NMongodbProvider.InsertManyDetails<TRowDocType>
    ) => Promise<Mongoose.InsertManyResult<TRowDocType>>;
  };

  export type Streams = {
    getFile: (streamId: UUID) => Nullable<NStreamsService.StreamStorage>;
    getFileBuffer: (streamId: UUID) => Nullable<Buffer>;
  };
}
