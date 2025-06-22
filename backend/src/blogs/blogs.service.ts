import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageService } from 'src/storage/storage.service';
import { StorageFolderEnum } from 'src/storage/storage-folder.enum';
import { ApiResponse } from 'src/common/dto/api-response.dto';
import { GetAllBlogsDto } from './dto/get-all-blogs.dto';

@Injectable()
export class BlogsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async create(
    createBlogDto: CreateBlogDto,
    authUser: User,
    file: Express.Multer.File,
  ) {
    const { title, description, content } = createBlogDto;

    const exist = await this.prismaService.blog.findFirst({
      where: {
        title,
      },
    });

    if (exist) {
      throw new Error('Blog with this title already exists');
    }

    const imageUrl = await this.storageService.uploadFile(
      file,
      StorageFolderEnum.BLOGS,
    );

    try {
      const blog = await this.prismaService.blog.create({
        data: {
          title,
          description,
          content,
          imageUrl,
          authorId: authUser.id,
        },
      });

      return new ApiResponse(blog, 'Blog created successfully');
    } catch (error) {
      await this.storageService.deleteFile(imageUrl);
      throw new Error('Error creating blog ' + error.message);
    }
  }

  findAll(getAllBlogsDto: GetAllBlogsDto) {
    const { filter } = getAllBlogsDto;

    const text = filter?.find((item) => item.id === 'text');

    if (text) {
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
