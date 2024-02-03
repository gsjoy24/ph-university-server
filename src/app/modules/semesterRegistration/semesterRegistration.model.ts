import { Schema, model } from 'mongoose';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';
import { TSemesterRegistration } from './semesterRegistration.interface';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: [true, 'Academic semester is required!'],
      unique: true,
    },
    status: {
      type: String,
      enum: SemesterRegistrationStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required!'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required!'],
    },
    minCredit: {
      type: Number,
      required: [true, 'Minimum credit is required!'],
      default: 3,
    },
    maxCredit: {
      type: Number,
      required: [true, 'Maximum credit is required!'],
      default: 15,
    },
  },
  {
    timestamps: true,
  },
);

export const SemesterRegistration = model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
