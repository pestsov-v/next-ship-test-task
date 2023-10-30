import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
const { v4 } = Packages.uuid;
import { AbstractMongoSchema } from '@Documents';
import { MongoSchemaNames } from '../../common/mongo-schema-names';

import { NAbstractMongoSchema } from '@Documents/Types';
import { NShipEmployee } from '@Apps/Types';
import { Schema } from 'mongoose';

@injectable()
export class ShipEmployeeMongoSchema extends AbstractMongoSchema {
  protected readonly _MODEL_NAME = MongoSchemaNames.SHIP_EMPLOYEE;
  constructor() {
    super();
  }

  protected setSchema(): NAbstractMongoSchema.MongooseSchema {
    const schema: NAbstractMongoSchema.MongooseSchema<NShipEmployee.EmployeeDocument> = {
      schema: {
        _id: {
          type: 'string',
          default: v4(),
        },
        name: {
          type: 'string',
          required: true,
        },
        surname: {
          type: 'string',
          required: true,
        },
        departmentId: {
          type: 'string',
          required: true,
          ref: MongoSchemaNames.SHIP_DEPARTMENT,
        },
        donationsIds: [
          {
            type: Schema.Types.String,
            ref: MongoSchemaNames.SHIP_DONATION,
          },
        ],
        statementsIds: [
          {
            type: Schema.Types.String,
            ref: MongoSchemaNames.SHIP_STATEMENT,
          },
        ],
        externalId: {
          type: 'string',
          required: true,
          unique: true,
        },
      },
      options: {
        timestamps: true,
        collection: MongoSchemaNames.SHIP_EMPLOYEE,
      },
    };

    return {
      schema: schema.schema,
      options: schema.options,
    };
  }
}
