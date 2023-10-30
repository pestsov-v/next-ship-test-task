import { HttpMethod } from '@Utility/Types';
import { NAbstractFrameworkAdapter } from '../adapters';
import { Mongoose } from '@Packages/Types';
import { NStreamsService } from '../services';

export interface IApplicationSchemaLoader {
  readonly appSchema: NApplicationSchemaLoader.ApplicationSchema;
  readonly mongoSchemas: NApplicationSchemaLoader.CollectionMongoSchema[];

  init(): Promise<void>;
  setApplication(name: string): void;
  setRoute(details: NApplicationSchemaLoader.RouteDetails): void;
  setMongoSchema(details: NApplicationSchemaLoader.MongoSchemaDetails): void;
}

export namespace NApplicationSchemaLoader {
  export interface BaseCollectionRoute {
    isStreamData: boolean;
  }

  export interface StandardCollectionRoute extends BaseCollectionRoute {
    isStreamData: false;
    path: string;
    method: HttpMethod;
    handler: NAbstractFrameworkAdapter.Handler;
    isPrivateUser?: boolean;
    isPrivateOrganization?: boolean;
  }

  export interface FormDataCollectionRoute extends BaseCollectionRoute, StandardCollectionRoute {
    isStreamData: true;
  }

  export type CollectionRoute = StandardCollectionRoute | FormDataCollectionRoute;

  export type CollectionStorage = {
    routes: Map<string, CollectionRoute>;
    mongoSchema?: CollectionMongoSchema;
  };
  export type ApplicationStorage = {
    collections: Map<string, CollectionStorage>;
  };
  export type ApplicationSchema = Map<string, ApplicationStorage>;

  export interface BaseRouteDetails {
    isStreamData: boolean;
    application: string;
    collection: string;
    path: string;
    route: CollectionRoute;
    name: string;
  }

  export interface StandardRouteDetails extends BaseRouteDetails {
    isStreamData: false;
  }

  export interface StreamRouteDetails extends BaseRouteDetails {
    isStreamData: true;
  }

  export type RouteDetails = StandardRouteDetails | StreamRouteDetails;

  export type CollectionMongoSchema<Schema = unknown, DocType = Mongoose.FlatRecord<DocType>> = {
    name: string;
    schema: Mongoose.SchemaDefinition<Schema>;
    options?: Mongoose.SchemaOptions<
      Schema,
      TInstanceMethods,
      TQueryHelpers,
      Mongoose.TVirtual,
      Mongoose.THydratedDocumentType
    >;
  };

  export type MongoSchemaDetails = {
    application: string;
    collection: string;
    schema: CollectionMongoSchema;
  };
}
