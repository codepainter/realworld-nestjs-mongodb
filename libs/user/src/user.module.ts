import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateUserCommandHandler } from './commands/create-user/create-user.command-handler';
import { CreateUserController } from './controllers/create-user/create-user.controller';
import { UserAggregateFactory } from './domains/user.factory';
import { UserMongoWriteRepository } from './repositories/user-mongo.write-repository';
import {
  USER_AGGREGATE_FACTORY,
  USER_MONGO_WRITE_REPOSITORY,
} from './user.constants';

const Domains: Provider[] = [
  {
    provide: USER_AGGREGATE_FACTORY,
    useClass: UserAggregateFactory,
  },
];

const CommandHandlers: Provider[] = [CreateUserCommandHandler];

const Repositories: Provider[] = [
  {
    provide: USER_MONGO_WRITE_REPOSITORY,
    useClass: UserMongoWriteRepository,
  },
];

@Module({
  imports: [CqrsModule],
  controllers: [CreateUserController],
  providers: [...Domains, ...CommandHandlers, ...Repositories],
  exports: [],
})
export class UserModule {}
