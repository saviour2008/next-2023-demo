import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserDataDTO {
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
