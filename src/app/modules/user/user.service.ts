/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import sendImgToCloudinary from '../../utils/sendImgToCloudinary';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';
import { TFaculty } from '../Faculty/faculty.interface';
import { Faculty } from '../Faculty/faculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { USER_ROLES } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  // create a new user object
  const userData: Partial<TUser> = {};
  userData.role = 'student';
  userData.email = payload.email;
  userData.password = password || (config.default_password as string);

  // find semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(400, 'Admission semester not found');
  }

  // check if academic department exists
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  payload.academicFaculty = academicDepartment.academicFaculty;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate id
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );

    if (file) {
      const imgName = `${
        userData.id
      }-${payload?.name?.firstName.toLowerCase()}`;

      const path = file?.path as string;
      const uploadedPhoto = await sendImgToCloudinary(imgName, path);
      payload.profileImg = (uploadedPhoto as { secure_url?: string })
        ?.secure_url as string;
    
    }

    // create a user on db
    const newUser = await User.create([userData], { session });

    // checking if the user is created
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student 2');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student 3');
  }
};

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'faculty';
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // check if the file is given or not, if given then upload to cloudinary, and set the url to profileImg
    if (file) {
      const imgName = `${
        userData.id
      }-${payload?.name?.firstName.toLowerCase()}`;
      const path = file?.path as string;
      const uploadedPhoto = await sendImgToCloudinary(imgName, path);
      payload.profileImg = (uploadedPhoto as { secure_url?: string })
        ?.secure_url as string;
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role and email
  userData.role = 'admin';
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // check if the file is given or not, if given then upload to cloudinary, and set the url to profileImg
    if (file) {
      const imgName = `${
        userData.id
      }-${payload?.name?.firstName.toLowerCase()}`;
      const path = file?.path as string;
      const uploadedPhoto = await sendImgToCloudinary(imgName, path);
      payload.profileImg = (uploadedPhoto as { secure_url?: string })
        ?.secure_url as string;
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const changeUserStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const getMe = async (user: JwtPayload) => {
  const { role, userId } = user;

  let result: Record<string, unknown> | null = {};

  if (role === USER_ROLES.student) {
    result = await Student.findOne({
      id: userId,
    }).populate('user');
  } else if (role === USER_ROLES.faculty) {
    result = await Faculty.findOne({
      id: userId,
    }).populate('user');
  } else if (role === USER_ROLES.admin) {
    result = await Admin.findOne({
      id: userId,
    }).populate('user');
  } else if (role === USER_ROLES.superAdmin) {
    result = await User.findOne({ id: userId });
  }

  // if user not found
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  changeUserStatus,
  getMe,
};
