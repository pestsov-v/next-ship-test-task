import { Mongoose } from '@Packages/Types';
import { NAbstractFrameworkAdapter } from '@Core/Types';

export namespace NShipDonation {
  export type DonationStructure = {
    _id: string;
    employeeId: string;
    externalId: string;
    date: Date;
    amount: number;
  };

  export interface DonationDocument extends Mongoose.Document, DonationStructure {}

  export interface IMongoRepository {
    createDonations(
      agents: NAbstractFrameworkAdapter.Agents,
      docs: DonationStructure[]
    ): Promise<void>;
  }
}
