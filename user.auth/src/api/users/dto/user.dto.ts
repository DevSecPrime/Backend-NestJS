import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 10)
  countryCode: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 20)
  phoneNo: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 255)
  password: string;
}
