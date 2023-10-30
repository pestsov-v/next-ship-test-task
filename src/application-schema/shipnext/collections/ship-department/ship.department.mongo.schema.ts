import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
const { v4 } = Packages.uuid;
import { AbstractMongoSchema } from '@Documents';
import { MongoSchemaNames } from '../../common/mongo-schema-names';

import { NShipDepartment } from '@Apps/Types';
import { NAbstractMongoSchema } from '@Documents/Types';

@injectable()
export class ShipDepartmentMongoSchema extends AbstractMongoSchema {
  protected readonly _MODEL_NAME = MongoSchemaNames.SHIP_DEPARTMENT;
  constructor() {
    super();
  }

  protected setSchema(): NAbstractMongoSchema.MongooseSchema {
    const schema: NAbstractMongoSchema.MongooseSchema<NShipDepartment.DepartmentDocument> = {
      schema: {
        _id: {
          type: 'string',
          default: v4(),
        },
        externalId: {
          type: 'string',
          required: true,
        },
        name: {
          type: 'string',
          required: true,
        },
      },
      options: {
        timestamps: true,
        collection: MongoSchemaNames.SHIP_DEPARTMENT,
      },
    };

    return {
      schema: schema.schema,
      options: schema.options,
    };
  }
}
