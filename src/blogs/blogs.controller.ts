import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import BlogsService from './blogs.service';
import ParamsWithId from '../utils/paramsWithId';
import BlogDto from './dto/blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  async getAllBlogs() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  async getBlog(@Param() { id }: ParamsWithId) {
    return this.blogsService.findOne(id);
  }

  @Post()
  async createBlog(@Body() blog: BlogDto) {
    return this.blogsService.create(blog);
  }

  @Delete(':id')
  async deleteBlog(@Param() { id }: ParamsWithId) {
    return this.blogsService.delete(id);
  }

  @Put(':id')
  async updateBlog(@Param() { id }: ParamsWithId, @Body() blog: BlogDto) {
    return this.blogsService.update(id, blog);
  }
}

export default BlogsController;
