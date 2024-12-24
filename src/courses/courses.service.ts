import { Inject, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Model } from 'mongoose';
import { Course } from './interfaces/course.interface';

@Injectable()
export class CoursesService {
  constructor(
    @Inject('COURSE_MODEL') private courseModel: Model<CreateCourseDto>,
  ) {}
  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const createCourse = new this.courseModel(createCourseDto);
    return createCourse.save();
  }

  findAll() {
    return `This action returns all courses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
