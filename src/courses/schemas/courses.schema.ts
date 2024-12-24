import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  cover: String,
});
