import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import Course from './course.model';

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

  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    const deletedpreRequisite = preRequisiteCourses
      .filter((item) => item.course && item.isDeleted)
      .map((item) => item.course);

    const deletedpreRequisiteCourses = await Course.findByIdAndUpdate(
      id,
      {
        $pull: {
          preRequisiteCourses: {
            course: {
              $in: deletedpreRequisite,
            },
          },
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  //* here we are updating basic data
  const updateBasicData = await Course.findByIdAndUpdate(
    id,
    courseRemainingData,
    {
      new: true,
      runValidators: true,
    },
  );
  return updateBasicData;
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
