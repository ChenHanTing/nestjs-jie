import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './blogs.schema';
import BlogDto from './dto/blog.dto';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async findAll() {
    return this.blogModel.find();
  }

  create(blogData: BlogDto) {
    const createdPost = new this.blogModel(blogData);
    return createdPost.save();
  }

  async update(id: string, blogData: BlogDto) {
    const blog = await this.blogModel
      .findByIdAndUpdate(id, blogData)
      .setOptions({ overwrite: true, new: true });
    if (!blog) {
      throw new NotFoundException();
    }
    return blog;
  }

  async findOne(id: string) {
    const blog = await this.blogModel.findById(id);
    if (!blog) {
      throw new NotFoundException();
    }
    return blog;
  }

  async delete(blogId: string) {
    const result = await this.blogModel.findByIdAndDelete(blogId);
    if (!result) {
      throw new NotFoundException();
    }
  }
}

export default BlogsService;