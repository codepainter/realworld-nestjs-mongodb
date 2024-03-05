import { UserProps } from '../domains/user.aggregate';

export interface IUserWriteRepository {
  create(props: UserProps): Promise<void>;
}
