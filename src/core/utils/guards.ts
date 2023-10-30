import { SchemaHeaders } from '@Common';

export class Guards {
  public static isString(x: string | unknown): x is string {
    return typeof x === 'string';
  }

  public static isHasOwnProperty<T extends string = string>(
    x: Record<T, unknown>,
    field: T
  ): boolean {
    return x.hasOwnProperty(field);
  }

  public static tgIsSchemaHeadersExists(x: Record<string, string>): boolean {
    return !!(
      Guards.isHasOwnProperty(x, SchemaHeaders.X_APPLICATION_NAME) &&
      Guards.isString(x[SchemaHeaders.X_APPLICATION_NAME]) &&
      Guards.isHasOwnProperty(x, SchemaHeaders.X_COLLECTION_NAME) &&
      Guards.isString(x[SchemaHeaders.X_COLLECTION_NAME]) &&
      Guards.isHasOwnProperty(x, SchemaHeaders.X_VERSION) &&
      Guards.isString(x[SchemaHeaders.X_VERSION]) &&
      Guards.isHasOwnProperty(x, SchemaHeaders.X_ACTION_NAME) &&
      Guards.isString(x[SchemaHeaders.X_ACTION_NAME]) &&
      Guards.isHasOwnProperty(x, SchemaHeaders.X_ACTION_METHOD) &&
      Guards.isString(x[SchemaHeaders.X_ACTION_METHOD])
    );
  }
}
