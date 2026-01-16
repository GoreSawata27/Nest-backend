import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { CreateUserDTO } from './dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async getUsers(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).select('-password').exec();
  }

  async updateUser(id: string, dto: CreateUserDTO): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, dto, { new: true })
      .select('-password')
      .exec();
  }

  async deleteUser(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
