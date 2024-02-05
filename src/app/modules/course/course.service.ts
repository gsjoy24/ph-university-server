/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { CourseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';

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
  const meta = await CourseQuery.countTotal();
  return { meta, result };
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  return result;
};

const updateCourseIntoDB = async (id: string, courseData: Partial<TCourse>) => {
  // * checking if course exists
  const course = await Course.findById(id);
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

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
  // * checking if course exists
  const course = await Course.findById(id);
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    { course: id, $addToSet: { faculties: { $each: payload } } },
    {
      new: true,
      upsert: true,
    },
  );
  return result;
};

const getFacultiesWithCourseFromDB = async (courseId: string) => {
  const result = await CourseFaculty.findOne({ course: courseId }).populate(
    'faculties',
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  getFacultiesWithCourseFromDB,
};
