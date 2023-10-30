import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { MongoSchemaNames } from '../../common/mongo-schema-names';

import { NShipEmployee } from '@Apps/Types';
import { NAbstractFrameworkAdapter } from '@Core/Types';

@injectable()
export class ShipEmployeeMongoRepository implements NShipEmployee.IMongoRepository {
  private _MODEL_NAME = MongoSchemaNames.SHIP_EMPLOYEE;

  public async createEmployees(
    agents: NAbstractFrameworkAdapter.Agents,
    docs: NShipEmployee.EmployeeStructure[]
  ): Promise<void> {
    try {
      const { businessAgent } = agents;

      await businessAgent.mongoose.create(this._MODEL_NAME, docs);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async calculateEmployeeRemuneration(
    agents: NAbstractFrameworkAdapter.Agents
  ): Promise<any> {
    const { businessAgent } = agents;
    try {
      return await businessAgent.mongoose.aggregate(this._MODEL_NAME, {
        pipeline: [
          // 1. Association with collections of donations
          {
            $lookup: {
              from: MongoSchemaNames.SHIP_DONATION,
              localField: 'donationsIds',
              foreignField: '_id',
              as: 'donations',
            },
          },
          // 2. expanding all fields
          {
            $unwind: '$donations',
          },
          // 3. receipt of the amount of all donations by all employees
          {
            $group: {
              _id: null,
              totalDonationAmountAll: { $sum: '$donations.amount' },
              employees: { $push: '$$ROOT' },
            },
          },
          {
            $unwind: '$employees',
          },
          // 4. receipt of donations by a specific employee
          {
            $addFields: {
              totalDonationAmount: { $sum: '$employees.donations.amount' },
            },
          },
          // 5. calculation of the percentage of remuneration
          {
            $addFields: {
              rewardPercentage: {
                $multiply: [
                  // 6. checking the amount of donations by an employee is more than $100.
                  {
                    $cond: [{ $gte: ['$totalDonationAmount', 100] }, 1, 0],
                  },
                  {
                    $cond: [
                      { $ne: ['$totalDonationAmount', 0] },
                      // 7. receiving interest.
                      {
                        $multiply: [
                          { $divide: ['$totalDonationAmount', '$totalDonationAmountAll'] },
                        ],
                      },
                      0,
                    ],
                  },
                ],
              },
            },
          },
          // 9. adding reward pool value
          {
            $addFields: {
              totalDonationPool: 10000,
            },
          },
          // 10. multiplying the reward percentage by the reward pool
          {
            $addFields: {
              rewardAmount: {
                $multiply: ['$rewardPercentage', '$totalDonationPool'],
              },
            },
          },
          {
            $match: {
              rewardAmount: { $gt: 0 },
            },
          },
          // 11. display all fields
          {
            $project: {
              _id: 0,
              totalDonationAmount: 1,
              rewardPercentage: 1,
              employeeName: '$employees.name',
              employeeSurname: '$employees.surname',
              totalDonationPool: 1,
              rewardAmount: 1,
              totalDonationAmountAll: 1,
            },
          },
        ],
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
