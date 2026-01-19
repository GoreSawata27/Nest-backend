import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from 'src/schemas/blog.schema';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async getAllBlogs(@Request() req) {
    console.log(req);
    return this.blogService.getBlogs();
  }

  @Post()
  async createBlog(@Body() blogData: Partial<Blog>) {
    const blog = await this.blogService.createBlog(blogData);
    return { message: 'Blog created successfully', blog };
  }

  @Get(':id')
  async getBlogById(@Param('id') id: string) {
    return this.blogService.getBlogById(id);
  }

  @Put(':id')
  async updateBlog(@Param('id') id: string, @Body() blogData: Partial<Blog>) {
    const updatedBlog = await this.blogService.updateBlog(id, blogData);
    return { message: 'Blog updated successfully', updatedBlog };
  }

  @Delete(':id')
  async removeBlog(@Param('id') id: string) {
    const deletedBlog = await this.blogService.deleteBlog(id);
    return { message: 'Blog deleted successfully', deletedBlog };
  }
}
