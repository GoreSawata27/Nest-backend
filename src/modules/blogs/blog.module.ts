import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DbModule } from 'src/config/config.module';
import { Blog, BlogSchema } from 'src/schemas/blog.schema';
import { BlogController } from './blog.controller';

@Module({
  imports: [
    DbModule,
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
