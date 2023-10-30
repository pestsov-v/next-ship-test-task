import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
const { v4 } = Packages.uuid;
import { AbstractMongoSchema } from '@Documents';
import { MongoSchemaNames } from '../../common/mongo-schema-names';

import { NShipDonation } from '@Apps/Types';
import { NAbstractMongoSchema } from '@Documents/Types';

@injectable()
export class ShipDonationMongoSchema extends AbstractMongoSchema {
  protected readonly _MODEL_NAME = MongoSchemaNames.SHIP_DONATION;
  constructor() {
    super();
  }

  protected setSchema(): NAbstractMongoSchema.MongooseSchema {
    const schema: NAbstractMongoSchema.MongooseSchema<NShipDonation.DonationDocument> = {
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
          unique: true,
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
        collection: MongoSchemaNames.SHIP_DONATION,
      },
    };

    return {
      schema: schema.schema,
      options: schema.options,
    };
  }
}
