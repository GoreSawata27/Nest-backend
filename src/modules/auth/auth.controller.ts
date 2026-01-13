import { Body, Controller, Post } from '@nestjs/common';
import { loginDTO, signupDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() payload: signupDTO) {
    const user = await this.authService.signup(payload);
    return { message: 'User created ', user };
  }

  @Post('/signin')
  async login(@Body() payload: loginDTO) {
    const user = await this.authService.signin(payload);
    return { message: 'logged in...', user };
  }
}
