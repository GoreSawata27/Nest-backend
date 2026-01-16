import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class signupDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/, {
    message:
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
  })
  password: string;

  @IsString()
  role: string;
}

export class loginDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
