import { IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export class UserDataDTO {
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  // @IsNumber()
  @IsNotEmpty()
  age: number;
}
