import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import EnrolledCourse from './enrolledCourse.model';
import { Student } from '../student/student.model';

const createEnrolledCourseIntoDB = async (userId: string, payload: any) => {
  const { offeredCourse } = payload;

  // check if offered course exists
  const isOfferedCourseExits = await OfferedCourse.findById(offeredCourse);
  if (!isOfferedCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found');
  }
  // check if student is already enrolled
  const student = await Student.findOne({ id: userId }).select('_id');
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const isEnrolled = await EnrolledCourse.findOne({
    offeredCourse,
    student: student?._id,
    semesterRegistration: isOfferedCourseExits?.semesterRegistration,
  });
  if (isEnrolled) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Student is already enrolled in this course',
    );
  }

  // check the capacity of offered course
  if (isOfferedCourseExits?.maxCapacity === 0) {
    throw new AppError(httpStatus.CONFLICT, 'Course capacity is full');
  }

  const result = await EnrolledCourse.create({
    semesterRegistration: isOfferedCourseExits?.semesterRegistration,
    academicSemester: isOfferedCourseExits?.academicSemester,
    academicFaculty: isOfferedCourseExits?.academicFaculty,
    academicDepartment: isOfferedCourseExits?.academicDepartment,
    offeredCourse,
    course: isOfferedCourseExits?.course,
    student: student?._id,
    faculty: isOfferedCourseExits?.faculty,
  });
  return result;
};

const updateEnrolledCourseMarksIntoDB = async (
  userId: string,
  payload: any,
) => {
  const result = {};
  return result;
};

const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB,
};

export default EnrolledCourseServices;
