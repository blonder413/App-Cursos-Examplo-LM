import { Inject, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Model, Types } from 'mongoose';
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

  findOne(id: string) {
    return this.courseModel.findOne({ id });
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {
    return this.courseModel.findOneAndUpdate({ _id:id }, updateCourseDto, {
      upsert: true,
      new: true,
    });
  }

  remove(id: string) {
    const _id = new Types.ObjectId(id);
    return this.courseModel.deleteOne({ _id });
  }
}
