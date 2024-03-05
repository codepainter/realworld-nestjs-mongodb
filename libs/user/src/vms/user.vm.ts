export class UserVM {
  readonly bio: string;
  readonly email: string;
  readonly image: string;
  readonly token: string;
  readonly username: string;

  constructor(props: UserVM) {
    Object.assign(this, props);
  }
}
