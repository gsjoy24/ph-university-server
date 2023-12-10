/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { CourseSearchableFields } from './course.constant';
import { TCourse, TPreRequisiteCourses } from './course.interface';
import Course from './course.model';
import mongoose from 'mongoose';

const createCourseIntoDB = async (courseData: TCourse) => {
  const result = await Course.create(courseData);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const CourseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await CourseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDB = async (id: string, courseData: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = courseData;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //* here we are updating basic data
    const updateBasicData = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateBasicData) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }

    // * here we are updating preRequisiteCourses
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      //* deleting preRequisiteCourses
      const deletedPreRequisite = preRequisiteCourses
        .filter((item) => item.course && item.isDeleted)
        .map((item) => item.course);

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: {
              course: {
                $in: deletedPreRequisite,
              },
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      
      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      // adding preRequisiteCourses
      const addedPreRequisite = preRequisiteCourses.filter(
        (item) => item.course && !item.isDeleted,
      );

      const addedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: {
              $each: addedPreRequisite,
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!addedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }
    }
    // getting final data
    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
};
