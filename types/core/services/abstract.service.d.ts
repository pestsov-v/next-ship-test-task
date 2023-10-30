export interface IAbstractService {
  start(): Promise<void>;
  stop(): Promise<void>;
}
