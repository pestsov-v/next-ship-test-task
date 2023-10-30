import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { v4 } = Packages.uuid;

import {
  NShipAccounting,
  NShipDepartment,
  NShipDonation,
  NShipEmployee,
  NShipRate,
  NShipStatement,
} from '@Apps/Types';
import { NAbstractController } from '@Documents/Types';
import { ResponseType, StatusCode } from '@Common';
import { ShipAccountingSymbols } from './ship.accounting.ioc.symbols';
import { ShipDepartmentSymbols } from '../ship-department/ship.department.ioc.symbols';
import { ShipDonationSymbols } from '../ship-donation/ship.donation.ioc.symbols';
import { ShipEmployeeSymbols } from '../ship-employee/ship.employee.ioc.symbols';
import { ShipRateSymbols } from '../ship-rate/ship.rate.ioc.symbols';
import { ShipStatementSymbols } from '../ship-statement/ship.statement.ioc.symbols';
import { Schema } from 'mongoose';

@injectable()
export class ShipAccountingController implements NShipAccounting.IController {
  constructor(
    @inject(ShipAccountingSymbols.Helper)
    private _shipAccountingHelper: NShipAccounting.IHelper,
    @inject(ShipDepartmentSymbols.MongoRepository)
    private _shipDepartmentMongoRepo: NShipDepartment.IMongoRepository,
    @inject(ShipDonationSymbols.MongoRepository)
    private _shipDonationMongoRepo: NShipDonation.IMongoRepository,
    @inject(ShipEmployeeSymbols.MongoRepository)
    private _shipEmployeeMongoRepo: NShipEmployee.IMongoRepository,
    @inject(ShipRateSymbols.MongoRepository)
    private _shipRateMongoRepo: NShipRate.IMongoRepository,
    @inject(ShipStatementSymbols.MongoRepository)
    private _shipStatementMongoRepo: NShipStatement.IMongoRepository
  ) {}

  public setEmployeeAccount = async (
    req: NAbstractController.Request<NShipAccounting.StreamBody>,
    agents: NAbstractController.Agents
  ): Promise<NAbstractController.Response> => {
    // TODO: // set validator for req.body
    const { businessAgent } = agents;

    try {
      const { streamId } = req.body;

      const buffer = businessAgent.streams.getFileBuffer(streamId);
      if (!buffer) {
        return {
          format: 'json',
          responseType: ResponseType.FAIL,
          status: StatusCode.BAD_REQUEST,
          data: {
            message: 'File not found',
          },
        };
      }

      const accounting = buffer.toString('utf-8');

      const { employees, rates } = this._shipAccountingHelper.parseAccountingData(accounting);

      const dbRates: NShipRate.RateStructure[] = [];
      rates
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .forEach((rate) => {
          const rateId = v4();
          const exists = dbRates.some((item) => item.sign === rate.sign && rate.date >= item.date);
          if (!exists) {
            dbRates.push({
              _id: rateId,
              date: rate.date,
              sign: rate.sign,
              value: rate.value,
            });
          }
        });

      try {
        await this._shipRateMongoRepo.createRates(agents, dbRates);
      } catch (e) {
        console.log(e);
      }

      const departments: NShipDepartment.DepartmentStructure[] = [];
      const users: NShipEmployee.EmployeeStructure[] = [];
      for (const employee of employees) {
        const departmentId = v4();
        if (employee.department.id.length > 0 && employee.department.name.length > 0) {
          const exists = departments.some((item) => item.name === employee.department.name);
          if (!exists)
            departments.push({
              _id: departmentId,
              externalId: employee.department.id,
              name: employee.department.name,
            });
        }

        if (employee.employee.name.length > 0 && employee.employee.surname.length > 0) {
          const userId = v4();

          const donations: NShipDonation.DonationStructure[] = [];
          const donationsIds: Schema.Types.String[] = [];
          const statementsIds: Schema.Types.String[] = [];

          if (employee.donations) {
            employee.donations.forEach((donation) => {
              const donationId = v4();

              let amount: number;
              if (donation.rate !== 'USD') {
                const currentRate = rates.find((rate) => rate.sign === donation.rate);
                if (!currentRate) {
                  throw new Error(` Unknown rate ${donation.rate}`);
                }

                amount = Number((currentRate.value * donation.amount).toFixed(5));
              } else {
                amount = donation.amount;
              }

              donations.push({
                _id: donationId,
                externalId: donation.id,
                employeeId: userId,
                date: donation.date,
                amount: amount,
              });

              donationsIds.push(donationId as unknown as Schema.Types.String);
            });

            try {
              await this._shipDonationMongoRepo.createDonations(agents, donations);
            } catch (e) {
              console.log(e);
            }
          }

          const statements: NShipStatement.StatementStructure[] = [];
          if (employee.statements) {
            employee.statements.forEach((statement) => {
              const statementId = v4();

              statements.push({
                _id: statementId,
                employeeId: userId,
                externalId: statement.id,
                date: statement.date,
                amount: statement.amount,
              });
              statementsIds.push(statementId as unknown as Schema.Types.String);
            });

            try {
              await this._shipStatementMongoRepo.createStatements(agents, statements);
            } catch (e) {
              console.log(e);
            }
          }

          users.push({
            _id: userId,
            departmentId: departmentId,
            externalId: employee.employee.id,
            statementsIds: statementsIds,
            donationsIds: donationsIds,
            name: employee.employee.name,
            surname: employee.employee.surname,
          });
        }
      }

      try {
        await this._shipDepartmentMongoRepo.createDepartments(agents, departments);
      } catch (e) {
        console.log(e);
      }

      try {
        await this._shipEmployeeMongoRepo.createEmployees(agents, users);
      } catch (e) {
        console.log(e);
      }
    } catch (e: any) {
      console.log(e);
      // TODO: set base e error for base agent
      return {
        format: 'json',
        responseType: ResponseType.ERROR,
        status: StatusCode.SERVER_ERROR,
        data: {
          message: e.message,
        },
      };
    }
  };
}
