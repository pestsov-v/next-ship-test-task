import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
const { v4 } = Packages.uuid;
import { AbstractMongoSchema } from '@Documents';
import { MongoSchemaNames } from '../../common/mongo-schema-names';

import { NShipRate } from '@Apps/Types';
import { NAbstractMongoSchema } from '@Documents/Types';

@injectable()
export class ShipRateMongoSchema extends AbstractMongoSchema {
  protected readonly _MODEL_NAME = MongoSchemaNames.SHIP_RATE;
  constructor() {
    super();
  }

  protected setSchema(): NAbstractMongoSchema.MongooseSchema {
    const schema: NAbstractMongoSchema.MongooseSchema<NShipRate.RateDocument> = {
      schema: {
        _id: {
          type: 'string',
          default: v4(),
        },
        sign: {
          type: 'string',
          required: true,
          unique: true,
        },
        value: {
          type: 'number',
          required: true,
        },
        date: {
          type: 'date',
          required: true,
        },
      },
      options: {
        timestamps: true,
        collection: MongoSchemaNames.SHIP_RATE,
      },
    };

    return {
      schema: schema.schema,
      options: schema.options,
    };
  }
}
