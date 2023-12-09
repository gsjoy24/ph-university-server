import { TCourse } from './course.interface';
import Course from './course.model';

const createCourse = async (courseData: TCourse) => {
  const result = await Course.create(courseData);
  return result;
};

const getAllCourse = async () => {
  const result = await Course.find();
  return result;
};

const getSingleCourse = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const updateCourse = async (id: string, courseData: TCourse) => {
  const result = await Course.findByIdAndUpdate(id, courseData, {
    new: true,
  });
  return result;
};

const deleteCourse = async (id: string) => {
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
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
