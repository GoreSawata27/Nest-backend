import { Body, Controller, Post } from '@nestjs/common';
import { loginDTO, signupDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/signup')
  async signup(@Body() payload: signupDTO) {
    const user = await this.authService.signup(payload);
    return { message: 'User created successfully', user };
  }

  @Post('/signin')
  async login(@Body() payload: loginDTO) {
    const user = await this.authService.signin(payload);
    return { message: 'Logged in successfully', user };
  }
}
