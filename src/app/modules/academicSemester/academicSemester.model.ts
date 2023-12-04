import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCodes,
  AcademicSemesterNames,
  Months,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: [true, 'Semester name is required!'],
    enum: AcademicSemesterNames,
  },
  year: {
    type: Date,
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

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
