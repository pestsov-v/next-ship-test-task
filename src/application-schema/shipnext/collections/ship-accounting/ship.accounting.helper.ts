import { Packages } from '@Packages';
import { NShipAccounting } from '@Apps/Types';
import { Nullable } from '@Utility/Types';
const { injectable } = Packages.inversify;

@injectable()
export class ShipAccountingHelper implements NShipAccounting.IHelper {
  public parseAccountingData(data: string) {
    try {
      const list = data.replace('E-List', '');
      const [strEmployees, strRates] = list.trim().split('Rates');

      const rates: NShipAccounting.Rate[] = [];
      strRates.split('Rate').forEach((rate) => {
        const fields = this._parseRateFields(rate);
        if (fields) {
          rates.push(fields);
        }
      });

      const arrEmployees = strEmployees.split('Employee');
      const employees: NShipAccounting.AccountEntities[] = [];
      arrEmployees.forEach((strEmployee) => {
        const employee: NShipAccounting.AccountEntities = {
          employee: { id: '', name: '', surname: '' },
          department: { id: '', name: '' },
          statements: [],
          donations: [],
        };
        const entities = strEmployee.split('\n\n');

        entities.forEach((entity, index) => {
          if (index === 0) {
            const fields = this._parseEmployeeFields(entity);
            if (fields) employee['employee'] = fields;
          }
          if (entity.includes('Department')) {
            employee['department'] = this._parseDepartmentFields(entity);
          }
          if (entity.includes('Statement')) {
            employee.statements.push(this._parseStatementFields(entity));
          }
          if (entity.includes('Donation')) {
            employee.donations.push(this._parseDonationFields(entity));
          }
        });

        employees.push(employee);
      });

      return { employees, rates };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  private _parseEmployeeFields(fields: string): Nullable<NShipAccounting.Employee> {
    if (fields.trim().length > 0) {
      const [_, id, name, surname] = fields.split('\n');
      return {
        id: this._getValueFromSplit(id),
        name: this._getValueFromSplit(name),
        surname: this._getValueFromSplit(surname),
      };
    } else {
      return null;
    }
  }

  private _parseDepartmentFields(fields: string): NShipAccounting.Department {
    const [_, id, department] = fields.split('\n');

    return {
      id: this._getValueFromSplit(id),
      name: this._getValueFromSplit(department),
    };
  }

  private _parseStatementFields(fields: string): NShipAccounting.Statement {
    const [_, id, amount, date] = fields.split('\n');

    return {
      id: this._getValueFromSplit(id),
      amount: Number(this._getValueFromSplit(amount)),
      date: new Date(this._getValueFromSplit(date)),
    };
  }

  private _parseDonationFields = (fields: string): NShipAccounting.Donation => {
    const [_, id, date, amount] = fields.trim().split('\n');
    const [__, amountValue] = amount.trim().split(': ');
    const [salary, rate] = amountValue.trim().split(' ');

    return {
      id: this._getValueFromSplit(id),
      date: new Date(this._getValueFromSplit(date)),
      amount: Number(salary),
      rate: rate,
    };
  };

  private _parseRateFields = (fields: string): Nullable<NShipAccounting.Rate> => {
    const [date, sign, value] = fields.trim().split('\n');
    if (typeof date === 'string' && typeof sign === 'string' && typeof value === 'string') {
      return {
        date: new Date(this._getValueFromSplit(date)),
        sign: this._getValueFromSplit(sign),
        value: Number(this._getValueFromSplit(value)),
      };
    } else {
      return null;
    }
  };

  private _getValueFromSplit(str: string) {
    const [_, value] = str.trim().split(': ');
    return value;
  }
}
