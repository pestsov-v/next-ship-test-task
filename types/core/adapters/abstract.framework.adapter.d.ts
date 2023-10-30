import { Fastify } from '@Packages/Types';
import { AnyObject } from '@Utility';
import { NApplicationSchemaLoader } from '../loaders';
import { IBusinessAgent } from '../agents';
import { HttpResponseType } from '@Utility/Types';

export interface IAbstractFrameworkAdapter {
  start(): Promise<void>;
}

export namespace NAbstractFrameworkAdapter {
  export type ConfigConnect = {
    protocol: string;
    host: string;
    port: number;
  };
  export type ConfigUrls = {
    api: string;
  };
  export type Config = {
    serverTag: string;
    connect: ConfigConnect;
    urls: ConfigUrls;
    applicationSchemaPath: string;
    streamAccumulateType: string;
  };

  export type SchemaParams = {
    application: string;
    collection: string;
    version: string;
    action: string;
  };

  export type NotFoundMessage = {
    status: HttpResponseType[keyof HttpResponseType];
    message: string;
    correctPath: string;
  };

  export type FrameworkKind = 'fastify';
  export type FrameworkInstance = Fastify.FastifyInstance;
  export type Request<K extends FrameworkKind = FrameworkKind> = K extends 'fastify'
    ? Fastify.BaseRequest
    : never;
  export type Response<K extends FrameworkKind = FrameworkKind> = K extends 'fastify'
    ? Fastify.BaseReply
    : never;
  export type RequestType<Body = unknown, Headers = unknown, Query = unknown> = {
    body: Body;
    headers: Headers;
    query: Query;
  };

  export type SchemaRequest<K extends FrameworkKind = FrameworkKind, B> = K extends 'fastify'
    ? Fastify.FastifySchemaRequest<B>
    : never;
  export type SchemaResponse<K extends FrameworkKind = FrameworkKind> = K extends 'fastify'
    ? Fastify.FastifySchemaResponse
    : never;

  export type Agents = {
    businessAgent: IBusinessAgent;
  };

  export type Handler = <
    BODY = unknown,
    HEADERS = unknown,
    QUERY = unknown,
    REQUEST extends RequestType<BODY, HEADERS, QUERY> = RequestType<BODY, HEADERS, QUERY>,
    USER_INFO extends AnyObject = AnyObject,
    K extends FrameworkKind = FrameworkKind
  >(
    req: Request<K, REQUEST['body']>,
    agents: Agents,
    context: Context<USER_INFO>
  ) => Promise<FastifyBusinessResponse | void>;

  export type CollectionRouteParams = {
    application: string;
    collection: string;
    version: string;
    action: string;
    method: string;
  };

  export type ResolveCollectionRouteStatus = 'success' | 'miss';

  export interface BaseGetCollectionRoute {
    status: ResolveCollectionRouteStatus;
  }
  export interface SuccessCollectionRoute extends BaseGetCollectionRoute {
    status: 'success';
    info: NApplicationSchemaLoader.CollectionRoute;
  }

  export type SchemaField = 'application' | 'collection' | 'action' | 'method';
  export interface MissesSchemaField extends BaseGetCollectionRoute {
    status: 'miss';
    field: SchemaField;
  }

  export type GetCollectionRoute = SuccessCollectionRoute | MissesSchemaField;
}
