import config from '../../config';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a new user object
  const userData: Partial<TUser> = {};
  userData.role = 'student';
  userData.password = password || (config.default_password as string);

  // find semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate id
    userData.id = await generateId(admissionSemester as TAcademicSemester);

    // create a user on db
    const newUser = await User.create([userData], { session });

    // checking if the user is created
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent[0];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
    // throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
  }
};

export const UserServices = {
  createStudentIntoDB,
};
