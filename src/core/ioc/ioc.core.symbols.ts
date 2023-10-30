export const CoreSymbols = {
  // Initiator
  Initiator: Symbol('Initiator'),

  // Connectors
  ServiceConnector: Symbol('ServiceConnector'),

  // Framework adapters
  FastifyFrameworkAdapter: Symbol('FastifyFrameworkAdapter'),

  // Factories
  FrameworkFactory: Symbol('FrameworkFactory'),

  // Services
  DiscoveryService: Symbol('DiscoveryService'),
  LoggerService: Symbol('LoggerService'),
  GetawayService: Symbol('GetawayService'),
  AsyncStorageService: Symbol('AsyncStorageService'),

  // Agents
  BusinessAgent: Symbol('BusinessAgent'),
} as const;
