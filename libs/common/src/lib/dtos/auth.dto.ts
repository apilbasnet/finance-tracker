import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsEmail()
  @IsString()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

export class SignInDto {
  @IsEmail()
  @IsString()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
