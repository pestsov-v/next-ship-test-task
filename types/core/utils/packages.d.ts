import inversify from 'inversify';
import nconf from 'nconf';
import winston from 'winston';
import fastify from 'fastify';
import colors from 'colors';

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
