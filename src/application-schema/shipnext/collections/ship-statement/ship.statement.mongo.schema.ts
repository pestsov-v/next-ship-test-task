import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
const { v4 } = Packages.uuid;
import { AbstractMongoSchema } from '@Documents';
import { MongoSchemaNames } from '../../common/mongo-schema-names';

import { NShipStatement } from '@Apps/Types';
import { NAbstractMongoSchema } from '@Documents/Types';

@injectable()
export class ShipStatementMongoSchema extends AbstractMongoSchema {
  protected readonly _MODEL_NAME = MongoSchemaNames.SHIP_STATEMENT;
  constructor() {
    super();
  }

  protected setSchema(): NAbstractMongoSchema.MongooseSchema {
    const schema: NAbstractMongoSchema.MongooseSchema<NShipStatement.StatementDocument> = {
      schema: {
        _id: {
          type: 'string',
          default: v4(),
        },
        employeeId: {
          type: 'string',
          required: true,
          ref: MongoSchemaNames.SHIP_EMPLOYEE,
        },
        externalId: {
          type: 'string',
          required: true,
        },
        amount: {
          type: 'number',
          required: true,
        },
        date: {
          type: 'Date',
          required: true,
        },
      },
      options: {
        timestamps: true,
        collection: MongoSchemaNames.SHIP_STATEMENT,
      },
    };

    return {
      schema: schema.schema,
      options: schema.options,
    };
  }
}
