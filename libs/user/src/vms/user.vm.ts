import { Expose } from 'class-transformer';

export class UserVM {
  @Expose()
  readonly bio: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly image: string;

  @Expose()
  readonly token: string;

  @Expose()
  readonly username: string;

  constructor(props: UserVM) {
    Object.assign(this, props);
  }
}
