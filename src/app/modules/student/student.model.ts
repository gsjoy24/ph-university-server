import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUsername,
} from './student.interface';

const userNameSchema = new Schema<TUsername>(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'First name is required!'],
      maxlength: [20, 'First name can not have more than 20 characters.'],
      validate: {
        validator: function (value: string): boolean {
          const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
          return firstNameStr === value;
        },
        message: '{VALUE} is not in capitalize format!',
      },
    },
    middleName: {
      type: String,
      trim: true,
      maxlength: [20, 'Middle name can not have more than 20 characters.'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Last name is required!'],
      maxlength: [20, 'Last name can not have more than 20 characters.'],
      validate: {
        validator: (value: string) => validator.isAlpha(value),
        message: '{VALUE} is not valid!',
      },
    },
  },
  {
    _id: false,
  },
);

const guardianSchema = new Schema<TGuardian>(
  {
    fatherName: {
      type: String,
      trim: true,
      required: [true, "Father's name is required!"],
    },
    fatherOccupation: {
      type: String,
      trim: true,
      required: [true, "Father's occupation is required!"],
    },
    fatherContactNo: {
      type: String,
      trim: true,
      required: [true, "Father's contact no is required!"],
    },
    motherName: {
      type: String,
      trim: true,
      required: [true, "Mother's name is required!"],
    },
    motherOccupation: {
      type: String,
      trim: true,
      required: [true, "Mother's occupation is required!"],
    },
    motherContactNo: {
      type: String,
      trim: true,
      required: [true, "Mother's contact no is required!"],
    },
  },
  {
    _id: false,
  },
);

const localGuardianSchema = new Schema<TLocalGuardian>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Local guardian's name is required!"],
    },
    occupation: {
      type: String,
      trim: true,
      required: [true, "Local guardian's occupation is required!"],
    },
    contactNo: {
      type: String,
      trim: true,
      required: [true, "Local guardian's contact no is required!"],
    },
    address: {
      type: String,
      trim: true,
      required: [true, "Local guardian's address is required!"],
    },
  },
  {
    _id: false,
  },
);

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'ID is required!'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required!'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      trim: true,
      required: [true, 'Name is required!'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          "The gender field can be only the following: 'male', 'female' or 'other'.",
      },
      required: [true, 'Gender is required!'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      trim: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Contact no is required!'],
    },
    emergencyContactNo: {
      type: String,
      trim: true,
      required: [true, 'Emergency contact no is required!'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      trim: true,
      required: [true, 'Present address is required!'],
    },
    permanentAddress: {
      type: String,
      trim: true,
      required: [true, 'Permanent address is required!'],
    },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: [true, 'Admission semester is required!'],
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: [true, 'Academic department is required!'],
    },
    profileImg: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//! virtuals
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName || ''} ${
    this.name.lastName
  }`;
});

//! pre find middleware/hook
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
//! aggregation
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//! creating a static method
studentSchema.statics.IsStudentExists = async function (id: string) {
  const existingStudent = await Student.findOne({ id });
  return existingStudent;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
