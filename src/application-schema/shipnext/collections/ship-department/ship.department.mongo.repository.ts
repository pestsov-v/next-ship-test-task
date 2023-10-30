import { Packages } from '@Packages';
const { injectable } = Packages.inversify;

import { NShipDepartment } from '@Apps/Types';
import { NAbstractFrameworkAdapter } from '@Core/Types';
import { MongoSchemaNames } from '../../common/mongo-schema-names';

@injectable()
export class ShipDepartmentMongoRepository implements NShipDepartment.IMongoRepository {
  private readonly _MODEL_NAME = MongoSchemaNames.SHIP_DEPARTMENT;

  public async createDepartments(
    agents: NAbstractFrameworkAdapter.Agents,
    docs: NShipDepartment.DepartmentStructure[]
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
