export const CoreSymbols = {
  // Initiator
  Initiator: Symbol('Initiator'),

  // Connectors
  ServiceConnector: Symbol('ServiceConnector'),
  MongoDBConnector: Symbol('MongoDBConnector'),

  // Framework adapters
  FastifyFrameworkAdapter: Symbol('FastifyFrameworkAdapter'),

  // Factories
  FrameworkFactory: Symbol('FrameworkFactory'),

  // Services
  DiscoveryService: Symbol('DiscoveryService'),
  LoggerService: Symbol('LoggerService'),
  GetawayService: Symbol('GetawayService'),
  AsyncStorageService: Symbol('AsyncStorageService'),
  StreamsService: Symbol('StreamsService'),

  // Providers
  MongodbProvider: Symbol('MongodbProvider'),

  // Agents
  BusinessAgent: Symbol('BusinessAgent'),

  // Loaders
  ApplicationSchemaLoader: Symbol('ApplicationSchemaLoader'),
} as const;
