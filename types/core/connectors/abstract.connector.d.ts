export interface IAbstractConnector {
  start(): Promise<void>;
  stop(): Promise<void>;
}
