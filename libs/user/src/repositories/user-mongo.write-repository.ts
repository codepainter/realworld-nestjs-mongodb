import { Connection } from 'mongoose';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { MONGODB_CONNECTION, USER_MODEL } from '@app/database/mongodb';
import {
  UserModel,
  UserSchema,
} from '@app/database/mongodb/schemas/user.schema';
import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import { UserProps } from '../domains/user.aggregate';
import { UserAggregateFactory } from '../domains/user.factory';
import { DuplicateKeyException } from '../exceptions/user.exception';
import { IUserWriteRepository } from '../interfaces/user-mongo.write-repository.interface';
import { USER_AGGREGATE_FACTORY } from '../user.constants';

@Injectable()
export class UserMongoWriteRepository implements IUserWriteRepository {
  private model: UserModel;
  constructor(
    @InjectPinoLogger(UserMongoWriteRepository.name)
    private readonly logger: PinoLogger,
    @InjectConnection(MONGODB_CONNECTION) readonly connection: Connection,
    @Inject(USER_AGGREGATE_FACTORY) readonly factory: UserAggregateFactory,
  ) {
    this.model = this.connection.model(USER_MODEL, UserSchema);
  }

  async create(props: UserProps): Promise<void> {
    try {
      await this.model.create(props);
    } catch (error) {
      this.logger.error({ error }, 'Error');
      throw new DuplicateKeyException();
    }
  }
}
