import mongoose from 'mongoose';

export const VideoSchema = new mongoose.Schema({
  title: String,
  idCourse: mongoose.Types.ObjectId,
  description: String,
  source: String,
  score: Number,
});
