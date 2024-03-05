import { ResultBase } from '@app/shared/results/result.base';
import { UserCodes } from '@app/user/user.constants';
import { UserVM } from '@app/user/vms/user.vm';

export class CreateUserResult extends ResultBase<UserVM> {
  code = UserCodes.CREATED;
  message = 'User Created';

  constructor(user: UserVM) {
    super(user);
  }
}
