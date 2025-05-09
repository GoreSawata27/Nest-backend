import { Module } from '@nestjs/common';
import { userController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/user.schema';
import { DbModule } from 'src/config/config.module';

@Module({
  imports: [
    DbModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [userController],
  providers: [UserService],
})
export class UserModule {}
