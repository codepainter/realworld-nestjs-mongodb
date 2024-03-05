import { Expose, Type } from 'class-transformer';
import { IsEmail, IsString, ValidateNested } from 'class-validator';

export class UserBodyDto {
  @IsEmail()
  @IsString()
  @Expose({ name: 'email' })
  email: string;

  @IsString()
  @Expose({ name: 'password' })
  password: string;

  @IsString()
  username: string;
}

export class CreateUserRequestBodyDto {
  @ValidateNested()
  @Type(() => UserBodyDto)
  @Expose({ name: 'user' })
  user: UserBodyDto;
}
