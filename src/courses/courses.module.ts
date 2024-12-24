import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { coursesProviders } from './courses.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [CoursesController],
  imports: [DatabaseModule],
  providers: [CoursesService, ...coursesProviders],
})
export class CoursesModule {}
