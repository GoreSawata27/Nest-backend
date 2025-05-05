import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AppService } from 'src/app.service';
import { CreateUserDTO } from 'src/dto';

const USERS: CreateUserDTO[] = [
  {
    id: 1,
    name: 'sawata1',
    age: 21,
  },
  {
    id: 2,
    name: 'sawata2',
    age: 22,
  },
];

@Controller('/users')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('/')
  createUser(@Body() createUserDto: CreateUserDTO) {
    USERS.push(createUserDto);

    return {
      message: 'User added',
      user: USERS,
    };
  }

  @Get('/')
  getAllUsers() {
    return USERS;
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    const numericId = Number(id);
    const user = USERS.find((user) => user.id === numericId);

    return {
      data: user,
    };
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateDto: CreateUserDTO) {
    const numericId = Number(id);

    const user = USERS.find((user) => user.id === numericId);

    if (!user) {
      return { message: 'User not found' };
    }

    Object.assign(user, updateDto);

    return {
      message: 'User updated',
      user,
    };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const numericId = Number(id);

    const user = USERS.filter((user) => user.id !== numericId);

    return {
      message: 'User Deleted',
      user,
    };
  }
}
