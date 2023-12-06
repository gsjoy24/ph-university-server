import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCodes,
  AcademicSemesterNames,
  Months,
} from './academicSemester.constant';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: [true, 'Semester name is required!'],
    enum: AcademicSemesterNames,
  },
  year: {
    type: String,
    required: [true, 'Semester year is required!'],
  },
  code: {
    type: String,
    required: [true, 'Semester code is required!'],
    enum: AcademicSemesterCodes,
  },
  startMonth: {
    type: String,
    required: [true, 'Semester start month is required!'],
    enum: Months,
  },
  endMonth: {
    type: String,
    required: [true, 'Semester end month is required!'],
    enum: Months,
  },
});

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester is already exist!');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
