import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Faculty } from '../Faculty/faculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { HasTimeConflict } from './offeredCourse.utils';

const createOfferedCourseIntoDB = async (courseData: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    days,
    startTime,
    endTime,
  } = courseData;

  // check if semester registration exists
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found');
  }

  // check if academic faculty exists
  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty not found');
  }

  // check if academic department exists
  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found');
  }

  // check if course exists
  const isCourseExists = await Course.findById(course);
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  // check if faculty exists
  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }
  courseData.academicSemester = isSemesterRegistrationExists?.academicSemester;

  // check if the department id belongs to the faculty
  const isDepartmentBelongsToTheAcademicFaculty =
    await AcademicDepartment.findOne({
      _id: academicDepartment,
      academicFaculty,
    });
  if (!isDepartmentBelongsToTheAcademicFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicFacultyExists.name} does not belong to ${isAcademicDepartmentExists.name}`,
    );
  }

  // check if the course is already offered
  const isCourseAlreadyOffered = await OfferedCourse.findOne({
    semesterRegistration,
    academicFaculty,
    course,
  });
  if (isCourseAlreadyOffered) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This course is already offered',
    );
  }

  // get the schedules of the faculty
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: {
      $in: days,
    },
  }).select('days startTime endTime');

  // check if the time is available for the faculty
  if (HasTimeConflict(assignedSchedules, { days, startTime, endTime })) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This time faculty is not available at the time, choose a different time or day',
    );
  }
  const result = await OfferedCourse.create(courseData);
  return result;
};

const getAllOfferedCourseFromDB = async () => {
  const result = await OfferedCourse.find();
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, startTime, endTime, days } = payload;

  // check if offered course exists
  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found');
  }

  // check if the faculty exists
  const isFacultyExists = await Faculty.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  const { semesterRegistration } = isOfferedCourseExists;

  //check if the semester registration is upcoming
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update the offered course as it ${semesterRegistrationStatus?.status}`,
    );
  }
  // get the schedules of the faculty
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: {
      $in: days,
    },
  }).select('days startTime endTime');

  // check if the time is available for the faculty
  if (HasTimeConflict(assignedSchedules, { days, startTime, endTime })) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This time faculty is not available at the time, choose a different time or day',
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findByIdAndDelete(id);
  return result;
};

const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  deleteOfferedCourseFromDB,
};

export default OfferedCourseServices;
