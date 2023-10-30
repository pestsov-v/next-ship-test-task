import { Mongoose } from '@Packages/Types';
import { NAbstractFrameworkAdapter } from '@Core/Types';

export namespace NShipDepartment {
  export type DepartmentStructure = {
    _id: string;
    externalId: string;
    name: string;
  };

  export interface DepartmentDocument extends Mongoose.Document, DepartmentStructure {}

  export interface IMongoRepository {
    createDepartments(
      agents: NAbstractFrameworkAdapter.Agents,
      docs: NShipDepartment.DepartmentStructure[]
    ): Promise<void>;
  }
}
