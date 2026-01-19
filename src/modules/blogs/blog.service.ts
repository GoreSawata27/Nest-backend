import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from 'src/schemas/blog.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private readonly blogModel: Model<Blog>,
  ) {}

  async getBlogs(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async createBlog(blogData: Partial<Blog>): Promise<Blog> {
    const blog = new this.blogModel(blogData);
    return blog.save();
  }

  async getBlogById(id: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id).exec();

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    return blog;
  }

  async updateBlog(id: string, blogData: Partial<Blog>): Promise<Blog> {
    const updatedBlog = await this.blogModel
      .findByIdAndUpdate(id, blogData, { new: true })
      .exec();

    if (!updatedBlog) {
      throw new NotFoundException('Blog not found');
    }

    return updatedBlog;
  }

  async deleteBlog(id: string): Promise<Blog> {
    const deletedBlog = await this.blogModel.findByIdAndDelete(id).exec();

    if (!deletedBlog) {
      throw new NotFoundException('Blog not found');
    }

    return deletedBlog;
  }
}
