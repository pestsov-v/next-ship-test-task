import { NAbstractFrameworkAdapter } from '@Core/Types';

export namespace NAbstractController {
  export type Request<B> = NAbstractFrameworkAdapter.SchemaRequest<
    NAbstractFrameworkAdapter.FrameworkKind,
    B
  >;
  export type Response = NAbstractFrameworkAdapter.SchemaResponse;
  export type Agents = NAbstractFrameworkAdapter.Agents;
}
