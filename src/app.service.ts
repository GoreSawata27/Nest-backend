import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDTO } from './dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(dto: CreateUserDTO): Promise<User> {
    const newUser = new this.userModel(dto);
    return newUser.save();
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async updateUser(id: string, dto: CreateUserDTO): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
