import { Packages } from '@Packages';
const { injectable } = Packages.inversify;

import { IAbstractMongoSchema, NAbstractMongoSchema } from '@Documents/Types';
import { IApplicationSchemaLoader } from '@Core/Types';

@injectable()
export abstract class AbstractMongoSchema implements IAbstractMongoSchema {
  protected abstract _MODEL_NAME: string;

  protected abstract setSchema(): NAbstractMongoSchema.MongooseSchema;

  public setMongoSchema(
    application: string,
    collection: string,
    loader: IApplicationSchemaLoader
  ): void {
    const { schema, options } = this.setSchema();

    loader.setMongoSchema({
      application: application,
      collection: collection,
      schema: {
        name: this._MODEL_NAME,
        schema: schema,
        options: options,
      },
    });
  }
}
