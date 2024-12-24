import { Document } from 'mongoose';

export interface Course extends Document {
  readonly title: string;
  readonly price: number;
  readonly description: string;
  readonly cover: string;
}
