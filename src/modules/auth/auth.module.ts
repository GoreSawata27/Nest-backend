import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DbModule } from 'src/config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from 'src/schemas/auth.schema';

@Module({
  imports: [
    DbModule,
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
