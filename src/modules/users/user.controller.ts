import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto';
import { UserService } from './user.service';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from './roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Roles('admin')
@Controller('/users')
export class userController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getAllUsers() {
    return this.userService.getUsers();
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    if (!user) return { message: 'User not found' };
    return { data: user };
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() dto: CreateUserDTO) {
    const user = await this.userService.updateUser(id, dto);
    if (!user) return { message: 'User not found' };
    return { message: 'User updated', user };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.userService.deleteUser(id);
    if (!user) return { message: 'User not found' };
    return { message: 'User deleted', user };
  }
}
