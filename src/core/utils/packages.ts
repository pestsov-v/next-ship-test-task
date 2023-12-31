import os from 'os';
import path from 'path';
import fs from 'fs';
import { AsyncLocalStorage } from 'async_hooks';

import { injectable, inject, ContainerModule, Container } from 'inversify';
import nconf from 'nconf';
import winston from 'winston';
import colors from 'colors';
import fastify from 'fastify';
import { v4 } from 'uuid';
import mongoose from 'mongoose';
import { EventEmitter } from 'events';

export class Packages {
  public static get os() {
    return { os };
  }

  public static get path() {
    return { path };
  }

  public static get fs() {
    return { pfs: fs.promises, fs: fs };
  }

  public static get async_hooks() {
    return { AsyncLocalStorage };
  }

  public static get events() {
    return { EventEmitter };
  }

  public static get inversify() {
    return { injectable, inject, ContainerModule, Container };
  }

  public static get fastify() {
    return { fastify };
  }

  public static get uuid() {
    return { v4 };
  }

  public static get nconf() {
    return { nconf };
  }

  public static get winston() {
    return {
      Container: winston.Container,
      format: winston.format,
      transports: winston.transports,
    };
  }

  public static get mongoose() {
    return { models: mongoose.models, mongoose };
  }

  public static get colors() {
    return { colors };
  }
}
