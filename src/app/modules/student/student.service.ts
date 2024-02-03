import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { studentSearchableFields } from './student.constant';
import { TStudent } from './student.interface';
import { Student } from './student.model';

// * get all students
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const searchTerm = query?.searchTerm ? query?.searchTerm : '';
  // const queryObj = { ...query };

  // // searching
  // const searchQuery = Student.find({
  //   $or: [
  //     'email',
  //     'name.firstName',
  //     'name.lastName',
  //     'contactNumber',
  //     'presentAddress',
  //   ].map((key) => ({
  //     [key]: {
  //       $regex: searchTerm,
  //       $options: 'i',
  //     },
  //   })),
  // });

  // // filtering
  // excludeFields.forEach((el) => delete queryObj[el]);
  // const filteredQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  // .populate({
  //   path: 'academicDepartment',
  //   populate: {
  //     path: 'academicFaculty',
  //   },
  // });

  // // sorting
  // const sort = query?.sort ? (query?.sort as string) : '-createdAt';
  // const sortQuery = filteredQuery.sort(sort);

  // //limiting
  // const limit = query?.limit ? Number(query?.limit) : 1;
  // const page = query?.page ? Number(query?.page) : 1;
  // const skip = (page - 1) * limit;

  // const paginateQuery = sortQuery.skip(skip);
  // const limitingQuery = paginateQuery.limit(limit);

  // // fields limiting
  // const fields = query?.fields
  //   ? (query?.fields as string).split(',').join(' ')
  //   : '-__v';
  // const fieldsQuery = await limitingQuery.select(fields);

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

// * get single student
const getSingleStudentsFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  return result;
};

// * update student
const updateStudentsIntoDB = async (id: string, payload: Partial<TStudent>) => {
  // check if student exists or not
  const student = await Student.IsStudentExists(id);
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const { name, guardian, localGuardian, ...restData } = payload;
  const modifiedData: Record<string, unknown> = { ...restData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// * delete student
const deleteStudentsFromDB = async (id: string) => {
  // check if student exists or not
  const student = await Student.IsStudentExists(id);
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    // get user _id from deletedStudent
    const userId = deletedStudent.user;
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  updateStudentsIntoDB,
  deleteStudentsFromDB,
};
