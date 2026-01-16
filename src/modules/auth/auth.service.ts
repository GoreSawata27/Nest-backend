import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { signupDTO, loginDTO } from './dto/auth.dto';
import { User } from '../../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async signup(payload: signupDTO): Promise<User> {
    const { name, email, password, role } = payload;

    const exists = await this.userModel.findOne({ email });
    if (exists) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPass = await bcrypt.hash(password, 10);

    return this.userModel.create({
      name,
      email,
      password: hashedPass,
      role,
    });
  }

  async signin(payload: loginDTO): Promise<User> {
    const { email, password } = payload;

    const user = await this.userModel.findOne({ email });
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
