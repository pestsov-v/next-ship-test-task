import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { MongoSchemaNames } from '../../common/mongo-schema-names';

import { NShipRate } from '@Apps/Types';
import { NAbstractFrameworkAdapter } from '@Core/Types';

@injectable()
export class ShipRateMongoRepository implements NShipRate.IMongoRepository {
  private _MODEL_NAME = MongoSchemaNames.SHIP_RATE;

  public async createRates(
    agents: NAbstractFrameworkAdapter.Agents,
    docs: NShipRate.RateStructure[]
  ): Promise<void> {
    try {
      const { businessAgent } = agents;

      await businessAgent.mongoose.insertMany(this._MODEL_NAME, {
        docs: docs,
        options: { lean: true },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
