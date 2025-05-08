import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from 'src/schemas/auth.schema';
import { Model } from 'mongoose';
import { signupDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly signUpModal: Model<Auth>,
  ) {}

  async signup(dto: signupDTO): Promise<Auth> {
    const newUser = new this.signUpModal(dto);
    return newUser.save();
  }
}
