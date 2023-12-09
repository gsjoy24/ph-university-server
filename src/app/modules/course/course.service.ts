import QueryBuilder from '../../builder/QueryBuilder';
import { TCourse } from './course.interface';
import Course from './course.model';

const createCourseIntoDB = async (courseData: TCourse) => {
  const result = await Course.create(courseData);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const CourseQuery = new QueryBuilder(Course.find(), query)
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await CourseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const updateCourseIntoDB = async (id: string, courseData: TCourse) => {
  const result = await Course.findByIdAndUpdate(id, courseData, {
    new: true,
  });
  return result;
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
