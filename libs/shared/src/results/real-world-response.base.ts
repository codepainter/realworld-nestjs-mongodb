import { IQueryResult } from '@nestjs/cqrs';

export abstract class RealworldResultBase<T> implements IQueryResult {
  readonly data: T;

  constructor(data: T) {
    this.data = data;
  }
}
