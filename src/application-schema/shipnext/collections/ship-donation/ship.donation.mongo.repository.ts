import { Packages } from '@Packages';
const { injectable } = Packages.inversify;

import { NShipDonation } from '@Apps/Types';
import { NAbstractFrameworkAdapter } from '@Core/Types';
import { MongoSchemaNames } from '../../common/mongo-schema-names';

@injectable()
export class ShipDonationMongoRepository implements NShipDonation.IMongoRepository {
  private _MODEL_NAME = MongoSchemaNames.SHIP_DONATION;

  public async createDonations(
    agents: NAbstractFrameworkAdapter.Agents,
    docs: NShipDonation.DonationStructure[]
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
