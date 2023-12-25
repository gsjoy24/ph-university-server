import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import EnrolledCourse from './enrolledCourse.model';
import { Student } from '../student/student.model';
import mongoose from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createEnrolledCourseIntoDB = async (userId: string, payload: any) => {
  const session = await mongoose.startSession();
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

  // check the max credit
  const semesterRegistration = await OfferedCourse.findById(
    isOfferedCourseExits?.semesterRegistration,
  ).select('maxCredit');

  try {
    session.startTransaction();

    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExits?.semesterRegistration,
          academicSemester: isOfferedCourseExits?.academicSemester,
          academicFaculty: isOfferedCourseExits?.academicFaculty,
          academicDepartment: isOfferedCourseExits?.academicDepartment,
          offeredCourse,
          course: isOfferedCourseExits?.course,
          student: student?._id,
          faculty: isOfferedCourseExits?.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    );

    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to enroll course');
    }

    // update the capacity of offered course
    await OfferedCourse.findByIdAndUpdate(offeredCourse, {
      $inc: { maxCapacity: -1 },
    });

    await session.commitTransaction();
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
  }
};

const updateEnrolledCourseMarksIntoDB = async () =>
  // userId: string,
  // payload: any,
  {
    const result = {};
    return result;
  };

const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB,
};

export default EnrolledCourseServices;
