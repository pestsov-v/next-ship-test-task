import { injectable, inject, ContainerModule, Container } from 'inversify';

export class Packages {
  public static get inversify() {
    return { injectable, inject, ContainerModule, Container };
  }
}
