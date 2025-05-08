import { Body, Controller, Post } from '@nestjs/common';
import { signupDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/')
  async signup(@Body() payload: signupDTO) {
    const user = this.authService.signup(payload);
    return { message: 'User created ', user };
  }
}
