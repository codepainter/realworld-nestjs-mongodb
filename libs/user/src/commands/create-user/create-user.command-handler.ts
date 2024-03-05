import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { CommandHandlerBase } from '@app/shared/cqrs/command-handler.base';
import { UserAggregateFactory } from '@app/user/domains/user.factory';
import { IUserWriteRepository } from '@app/user/interfaces/user-mongo.write-repository.interface';
import {
  USER_AGGREGATE_FACTORY,
  USER_MONGO_WRITE_REPOSITORY,
} from '@app/user/user.constants';
import { UserVM } from '@app/user/vms/user.vm';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from './create-user.command';
import { CreateUserResult } from './create-user.result';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler extends CommandHandlerBase<
  CreateUserCommand,
  CreateUserResult
> {
  constructor(
    @InjectPinoLogger(CreateUserCommandHandler.name)
    readonly logger: PinoLogger,
    @Inject(USER_AGGREGATE_FACTORY) private factory: UserAggregateFactory,
    @Inject(USER_MONGO_WRITE_REPOSITORY)
    private readonly repository: IUserWriteRepository,
  ) {
    super(logger);
  }

  async handleCommand(command: CreateUserCommand) {
    this.logger.debug({ command }, 'CreateUserCommand');

    const newUser = this.factory.create(command.props);
    await this.repository.create(newUser.props());

    const userVM = new UserVM(newUser.props());

    return new CreateUserResult(userVM);
  }
}
