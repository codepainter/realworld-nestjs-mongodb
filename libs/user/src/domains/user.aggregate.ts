import { AggregateRoot } from '@nestjs/cqrs';

export type UserRequiredProps = Required<{
  email: string;
  username: string;
  password: string;
  id: string;
  createdAt: Date;
}>;

export type UserOptionalProps = Partial<{
  bio: string;
  image: string;
  token: string;
  updatedAt: Date;
  deletedAt: Date;
}>;

export type UserProps = UserRequiredProps & UserOptionalProps;

export type CreateUserProps = Pick<
  UserProps,
  'email' | 'username' | 'password'
>;

export interface User {
  props: () => UserProps;
  commit(): void;
}

export class UserAggregate extends AggregateRoot implements User {
  private readonly id: string;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  private email: string;
  private username: string;
  private password: string;
  private bio: string = '';
  private image: string = '';
  private token: string = '';

  constructor(props: UserProps) {
    super();
    Object.assign(this, props);
  }

  props() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      email: this.email,
      username: this.username,
      password: this.password,
      bio: this.bio,
      image: this.image,
      token: this.token,
    };
  }
}
