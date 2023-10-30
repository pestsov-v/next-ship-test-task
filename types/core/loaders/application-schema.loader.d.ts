import { HttpMethod } from '@Utility/Types';
import { NAbstractFrameworkAdapter } from '../adapters';

export interface IApplicationSchemaLoader {
  readonly appSchema: NApplicationSchemaLoader.ApplicationSchema;

  init(): Promise<void>;
  setApplication(name: string): void;
  setRoute(details: NApplicationSchemaLoader.RouteDetails): void;
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
}
