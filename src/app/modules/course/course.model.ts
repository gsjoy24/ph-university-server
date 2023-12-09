import { Schema, model } from 'mongoose';
import { TCourse, TPreRequisiteCourses } from './course.interface';

const PreRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course is required!'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const CourseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Course name is required!'],
  },
  prefix: {
    type: String,
    trim: true,
    required: [true, 'Course prefix is required!'],
  },
  code: {
    type: Number,
    trim: true,
    required: [true, 'Course code is required!'],
  },
  credit: {
    type: Number,
    trim: true,
    required: [true, 'Course credit is required!'],
  },
  preRequisiteCourses: [PreRequisiteCoursesSchema],
});

const Course = model<TCourse>('Course', CourseSchema);
export default Course;
