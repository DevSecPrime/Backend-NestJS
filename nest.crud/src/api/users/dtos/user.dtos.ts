import {
  IsEmail,
  IsOptional,
  IsString,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @IsNotEmpty()
  @Length(1, 50)
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 20)
  @IsOptional()
  phno?: string;

  @IsString()
  @Length(1, 500)
  @IsNotEmpty()
  @IsOptional()
  description?: string;
}
