import os from 'os';
import path from 'path';
import fs from 'fs';

import { injectable, inject, ContainerModule, Container } from 'inversify';
import nconf from 'nconf';

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

  public static get inversify() {
    return { injectable, inject, ContainerModule, Container };
  }

  public static get nconf() {
    return { nconf };
  }
}
