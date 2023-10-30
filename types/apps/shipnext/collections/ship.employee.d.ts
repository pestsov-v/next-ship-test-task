import { Mongoose } from '@Packages/Types';
import { NAbstractFrameworkAdapter } from '@Core/Types';
import { Schema } from 'mongoose';

export namespace NShipEmployee {
  export type EmployeeStructure = {
    _id: string;
    name: string;
    surname: string;
    departmentId: string;
    statementsIds: Schema.Types.String[];
    donationsIds: Schema.Types.String[];
    externalId: string;
  };

  export interface EmployeeDocument extends Mongoose.Document, EmployeeStructure {}

  export interface IController {
    getEmployeesSalaries: NAbstractFrameworkAdapter.Handler;
  }

  export interface IMongoRepository {
    createEmployees(
      agents: NAbstractFrameworkAdapter.Agents,
      docs: EmployeeStructure[]
    ): Promise<void>;
    calculateEmployeeRemuneration(agents: NAbstractFrameworkAdapter.Agents): Promise<any>;
  }
}
