import { Packages } from '@Packages';
const { injectable } = Packages.inversify;

import { IAbstractRouter, NAbstractRouter } from '@Documents/Types';
import { IApplicationSchemaLoader, NApplicationSchemaLoader } from '@Core/Types';

@injectable()
export abstract class AbstractRouter implements IAbstractRouter {
  protected abstract readonly _paths: NAbstractRouter.Paths;
  protected abstract _routes: NAbstractRouter.Routes;

  public setRoutes(
    application: string,
    collection: string,
    loader: IApplicationSchemaLoader
  ): void {
    this._routes.forEach((route) => {
      let details: NApplicationSchemaLoader.RouteDetails;
      if (route.isStreamData) {
        details = {
          application: application,
          collection: collection,
          route: route,
          path: route.path,
          name: route.path + '{{' + route.method + '}}',
          isStreamData: route.isStreamData,
          streamType: route.streamType,
        };
      } else {
        details = {
          application: application,
          collection: collection,
          route: route,
          path: route.path,
          name: route.path + '{{' + route.method + '}}',
          isStreamData: false,
        };
      }

      loader.setRoute(details);
    });
  }
}
