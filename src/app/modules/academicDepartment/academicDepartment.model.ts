import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Pre Hooks
academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExists) {
    throw new Error('This department is Already Exists!');
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const id = this.getQuery();
  const isDepartmentExists = await AcademicDepartment.findOne(id);

  if (!isDepartmentExists) {
    throw new Error('This department does not Exists!');
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
