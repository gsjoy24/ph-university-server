import { Schema, model } from 'mongoose';
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from './course.interface';

const PreRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const CourseSchema = new Schema<TCourse>(
  {
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
    credits: {
      type: Number,
      trim: true,
      required: [true, 'Course credit is required!'],
    },
    preRequisiteCourses: [PreRequisiteCoursesSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const CourseFacultySchema = new Schema<TCourseFaculty>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      unique: true,
    },
    faculties: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Course = model<TCourse>('Course', CourseSchema);
export const CourseFaculty = model<TCourseFaculty>(
  'CourseFaculty',
  CourseFacultySchema,
);
