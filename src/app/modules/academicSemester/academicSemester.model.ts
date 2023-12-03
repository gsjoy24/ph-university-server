import { Schema, model } from 'mongoose';
import { TAcademicSemester, TMonths } from './academicSemester.interface';

const months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: [true, 'Semester name is required!'],
    enum: ['Autumn', 'Summer', 'Fall'],
  },
  year: {
    type: Date,
    required: [true, 'Semester year is required!'],
  },
  code: {
    type: String,
    required: [true, 'Semester code is required!'],
    enum: ['01', '02', '03'],
  },
  startMonth: {
    type: String,
    required: [true, 'Semester start month is required!'],
    enum: months,
  },
  endMonth: {
    type: String,
    required: [true, 'Semester end month is required!'],
    enum: months,
  },
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
