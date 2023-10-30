import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { MongoSchemaNames } from '../../common/mongo-schema-names';

import { NShipStatement } from '@Apps/Types';
import { NAbstractFrameworkAdapter } from '@Core/Types';

@injectable()
export class ShipStatementMongoRepository implements NShipStatement.IMongoRepository {
  private _MODEL_NAME = MongoSchemaNames.SHIP_STATEMENT;

  public async createStatements(
    agents: NAbstractFrameworkAdapter.Agents,
    docs: NShipStatement.StatementStructure[]
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
