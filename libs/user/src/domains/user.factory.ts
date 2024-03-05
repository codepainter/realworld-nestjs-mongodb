import { randomUUID } from 'crypto';

import { PasswordUtil } from '@app/shared/utils/password.util';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import { CreateUserProps, UserAggregate, UserProps } from './user.aggregate';

@Injectable()
export class UserAggregateFactory {
  constructor(private publisher: EventPublisher) {}

  create(props: CreateUserProps, id?: string): UserAggregate {
    const now = new Date();
    return this.publisher.mergeObjectContext(
      new UserAggregate({
        id: id || randomUUID(),
        createdAt: now,
        username: props.username,
        email: props.email,
        password: PasswordUtil.hash(props.password),
      }),
    );
  }

  reconstitute(props: UserProps) {
    return this.publisher.mergeObjectContext(
      new UserAggregate({
        id: props.id,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
        email: props.email,
        username: props.username,
        password: props.password,
        bio: props.bio,
        image: props.image,
        token: props.token,
      }),
    );
  }
}
