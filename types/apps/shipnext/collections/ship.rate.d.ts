import { Mongoose } from '@Packages/Types';
import { NAbstractFrameworkAdapter } from '@Core/Types';

export namespace NShipRate {
  export type RateStructure = {
    _id: string;
    date: Date;
    sign: string;
    value: number;
  };

  export interface RateDocument extends Mongoose.Document, RateStructure {}

  export interface IMongoRepository {
    createRates(agents: NAbstractFrameworkAdapter.Agents, docs: RateStructure[]): Promise<void>;
  }
}
