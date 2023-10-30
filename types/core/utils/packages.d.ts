import inversify from 'inversify';
import nconf from 'nconf';
import winston from 'winston';
import fastify from 'fastify';
import colors from 'colors';
import async_hooks from 'async_hooks';
import mongoose from 'mongoose';

export namespace Inversify {
  export namespace interfaces {
    export type Bind = inversify.interfaces.Bind;
    export type Container = inversify.interfaces.Container;
  }
}

export namespace Nconf {
  export type Provider = nconf.Provider;
}

export namespace Winston {
  export type Container = winston.Container;
  export type Logger = winston.Logger;
}

export namespace Color {
  export type Color = colors.Color;
}

export namespace Fastify {
  export type RawServerBase = fastify.RawServerBase;
  export type RawRequestDefaultExpression<RawServer extends RawServerBase = RawServerBase> =
    fastify.RawRequestDefaultExpression<RawServer>;
  export type FastifyBaseLogger = fastify.FastifyBaseLogger;
  export type FastifyTypeProvider = fastify.FastifyTypeProvider;
  export type BaseRequest = fastify.FastifyRequest;
  export type BaseReply = fastify.FastifyReply;

  export type FastifyInstance<
    RawServer extends RawServerBase = RawServerBase,
    RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
    RawReply extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
    Logger extends FastifyBaseLogger = FastifyBaseLogger,
    TypeProvider extends FastifyTypeProvider = FastifyTypeProvider
  > = fastify.FastifyInstance<RawServer, RawRequest, RawReply, Logger, TypeProvider>;

  export type FastifySchemaRequest<B = unknown> = {
    url: string;
    path: string;
    method: HttpMethod;
    body: B;
    params: Record<string, string>;
    query: string;
    headers: Record<string, string>;
  };

  export interface BaseFastifyBusinessResponse {
    format: FormatKind;
    responseType?: HttpResponseType[keyof HttpResponseType];
    status: HTTPStatusCode[keyof HTTPStatusCode];
    headers?: Record<string, string>;
  }

  export interface JsonFastifyBusinessResponse<DATA = unknown> extends BaseFastifyBusinessResponse {
    format: 'json';
    data?: DATA;
  }

  export interface SendStatusFastifyBusinessResponse extends BaseFastifyBusinessResponse {
    format: 'sendStatus';
  }

  export interface SendFileFastifyBusinessResponse extends BaseFastifyBusinessResponse {
    format: 'sendFile';
    contentType: any;
  }

  export type FastifySchemaResponse<RESULT = unknown> =
    | JsonFastifyBusinessResponse<RESULT>
    | SendStatusFastifyBusinessResponse
    | SendFileFastifyBusinessResponse
    | void;
}

export namespace AsyncHooks {
  export type AsyncLocalStorage<T> = async_hooks.AsyncLocalStorage<T>;
}

export namespace Mongoose {
  export type MongooseId = mongoose.Types.ObjectId;
  export type Document = mongoose.Document<string>;
  export type Mongoose = mongoose.Mongoose;
  export type ConnectionOptions = mongoose.ConnectOptions;

  export type THydratedDocumentType<TRawDocType> = mongoose.HydratedDocument<TRawDocType>;
  export type AnyKeys<TRawDocType> = mongoose.AnyKeys<TRawDocType>;
  export type FlatRecord<TRawDocType> = mongoose.FlatRecord<TRawDocType>;
  export type SchemaDefinition<T> = mongoose.SchemaDefinition<T>;
  export type SchemaOptions<
    DocType = mongoose.FlatRecord<DocType>,
    TInstanceMethods = {},
    TQueryHelpers = {},
    TStaticMethods = {},
    TVirtuals = {},
    THydratedDocumentType = THydratedDocumentType<DocType>
  > = mongoose.SchemaOptions<
    DocType,
    TInstanceMethods,
    TQueryHelpers,
    TStaticMethods,
    TVirtuals,
    THydratedDocumentType
  >;

  export type SaveOptions = mongoose.SaveOptions;
  export type PipelineStage = mongoose.PipelineStage;
  export type AggregateOptions = mongoose.AggregateOptions;
  export type AggregateResult<TRowDocType> = mongoose.Aggregate<Array<TRowDocType>>;
  export type Docs<TRawDocType, DocContents = AnyKeys<TRawDocType>> = Array<
    TRawDocType | DocContents
  >;
  export type InsertManyOptions = mongoose.InsertManyOptions & { lean: true };
  export type InsertManyResult<TRawDocType> = mongodb.InsertManyResult<TRawDocType>;
}
