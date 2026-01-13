import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from 'src/schemas/auth.schema';
import { Model } from 'mongoose';
import { signupDTO, loginDTO } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly signUpModal: Model<Auth>,
  ) {}

  async signup(payload: signupDTO): Promise<Auth> {
    const { name, email, password } = payload;

    const checkEmail = await this.signUpModal.findOne({ email });
    if (checkEmail) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await this.signUpModal.create({
      name,
      email,
      password: hashedPass,
    });

    return newUser;
  }

  async signin(payload: loginDTO): Promise<Auth> {
    const { email, password } = payload;

    const user = await this.signUpModal.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
