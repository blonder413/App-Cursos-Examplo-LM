import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { SlugPipe } from 'src/courses/pipes/slug/slug.pipe';
import { LoggerInterceptor } from 'src/utils/logger/logger.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/media.handle';

@Controller('videos')
@UseInterceptors(LoggerInterceptor)
@UsePipes(new ValidationPipe())
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    console.log(createVideoDto);

    return this.videosService.create(createVideoDto);
  }

  @Get()
  findAll(@Query() query: string) {
    console.log(query);

    return this.videosService.findAll();
  }

  @Get(':title')
  findOne(@Param('title', new SlugPipe()) title: string) {
    console.log('__title__:', title);

    return this.videosService.findOne(1);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('avatar',{storage:storage}))
  handleUpload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
