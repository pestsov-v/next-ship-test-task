import { NAbstractFrameworkAdapter } from '@Core/Types';
import { Mongoose } from '@Packages/Types';

export namespace NShipStatement {
  export type StatementStructure = {
    _id?: string;
    employeeId: string;
    externalId: string;
    date: Date;
    amount: number;
  };

  export interface StatementDocument extends Mongoose.Document, StatementStructure {}

  export interface IMongoRepository {
    createStatements(
      agents: NAbstractFrameworkAdapter.Agents,
      docs: StatementStructure[]
    ): Promise<void>;
  }
}
