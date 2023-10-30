import { NAbstractFrameworkAdapter } from '@Core/Types';
import { UUID } from '@Utility/Types';

export namespace NShipAccounting {
  export interface IController {
    setEmployeeAccount: NAbstractFrameworkAdapter.Handler;
  }

  export interface IHelper {
    parseAccountingData(data: string): AccountingInfo;
  }

  export type StreamBody = {
    streamId: UUID;
  };

  export type Rate = {
    date: Date;
    sign: string;
    value: number;
  };

  export type Employee = {
    id: string;
    name: string;
    surname: string;
  };
  export type Department = {
    id: string;
    name: string;
  };
  export type Statement = {
    id: string;
    amount: number;
    date: Date;
  };
  export type Donation = {
    id: string;
    date: Date;
    amount: number;
    rate: string;
  };

  export type AccountEntities = {
    employee: Employee;
    department: Department;
    donations: Donation[];
    statements: Statement[];
  };

  export type AccountingInfo = {
    employees: AccountEntities[];
    rates: Rate[];
  };
}
