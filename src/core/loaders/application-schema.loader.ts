import { Packages } from '@Packages';
const { injectable } = Packages.inversify;

import { IApplicationSchemaLoader, NApplicationSchemaLoader } from '@Core/Types';

@injectable()
export class ApplicationSchemaLoader implements IApplicationSchemaLoader {
  private _appSchema: NApplicationSchemaLoader.ApplicationSchema | undefined;

  public async init(): Promise<void> {
    this._appSchema = new Map<string, NApplicationSchemaLoader.ApplicationStorage>();
  }

  public get appSchema(): NApplicationSchemaLoader.ApplicationSchema {
    if (!this._appSchema) throw this._throwAppSchemaError();

    return this._appSchema;
  }

  public get mongoSchemas(): NApplicationSchemaLoader.CollectionMongoSchema[] {
    if (!this._appSchema) throw this._throwAppSchemaError();

    const schemas: NApplicationSchemaLoader.CollectionMongoSchema[] = [];
    this._appSchema.forEach((application) => {
      application.collections.forEach((collection) => {
        if (collection.mongoSchema) {
          schemas.push(collection.mongoSchema);
        }
      });
    });

    return schemas;
  }

  public setApplication(name: string): void {
    if (!this._appSchema) throw this._throwAppSchemaError();

    this._appSchema.set(name, {
      collections: new Map<string, NApplicationSchemaLoader.CollectionStorage>(),
    });
  }

  private _setCollection(
    application: NApplicationSchemaLoader.ApplicationStorage,
    collection: string
  ): void {
    application.collections.set(collection, {
      routes: new Map<string, NApplicationSchemaLoader.CollectionRoute>(),
    });
  }

  public setRoute(params: NApplicationSchemaLoader.RouteDetails): void {
    if (!this._appSchema) throw this._throwAppSchemaError();

    const application = this._appSchema.get(params.application);
    if (!application) {
      this.setApplication(params.application);
      this.setRoute(params);
      return;
    }
    const collection = application.collections.get(params.collection);
    if (!collection) {
      this._setCollection(application, params.collection);
      this.setRoute(params);
      return;
    }

    let route:
      | NApplicationSchemaLoader.StandardCollectionRoute
      | NApplicationSchemaLoader.FormDataCollectionRoute;
    if (params.isStreamData) {
      route = {
        path: params.path,
        method: params.route.method,
        handler: params.route.handler,
        isPrivateUser: params.route.isPrivateUser ?? false,
        isPrivateOrganization: params.route.isPrivateOrganization ?? false,
        isStreamData: true,
      };
    } else {
      route = {
        path: params.path,
        method: params.route.method,
        handler: params.route.handler,
        isPrivateUser: params.route.isPrivateUser ?? false,
        isPrivateOrganization: params.route.isPrivateOrganization ?? false,
        isStreamData: false,
      };
    }

    collection.routes.set(params.name, route);
  }

  public setMongoSchema<Schema>(details: NApplicationSchemaLoader.MongoSchemaDetails): void {
    const application = this.appSchema.get(details.application);
    if (!application) {
      this.setApplication(details.application);
      this.setMongoSchema<Schema>(details);
      return;
    }
    const collection = application.collections.get(details.collection);
    if (!collection) {
      this._setCollection(application, details.collection);
      this.setMongoSchema<Schema>(details);
      return;
    } else {
      collection.mongoSchema = details.schema;
    }
  }

  private _throwAppSchemaError(): Error {
    // TODO:
    return new Error('Application schema not initialize');
  }
}
