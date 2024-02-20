import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { Faculty } from '../Faculty/faculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { Student } from '../student/student.model';
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

const getAllOfferedCourseFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  const meta = await offeredCourseQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getMyOfferedCourseFromDB = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  // pagination setup
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  // check if the user exists
  const student = await Student.findOne({ id: userId });
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  // current ongoing semester registration
  const currentSemesterRegistration = await SemesterRegistration.findOne({
    status: 'ONGOING',
  });

  if (!currentSemesterRegistration) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'There is no ongoing semester registration',
    );
  }

  const aggregationQuery = [
    {
      $match: {
        semesterRegistration: currentSemesterRegistration?._id,
        academicDepartment: student.academicDepartment,
        academicFaculty: student.academicFaculty,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'course',
      },
    },
    {
      $unwind: '$course',
    },
    {
      $lookup: {
        from: 'enrolledcourses',
        let: { currentSemesterRegistration: currentSemesterRegistration?._id },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: [
                      '$semesterRegistration',
                      '$$currentSemesterRegistration',
                    ],
                  },
                  {
                    $eq: ['$student', student?._id],
                  },
                  {
                    $eq: ['$isEnrolled', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'enrolledCourses',
      },
    },
    {
      $lookup: {
        from: 'enrolledcourses',
        let: {},
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$student', student?._id],
                  },
                  {
                    $eq: ['$isCompleted', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'completedCourses',
      },
    },
    {
      $addFields: {
        completedCoursesIds: {
          $map: {
            input: '$completedCourses',
            as: 'completedCourse',
            in: '$$completedCourse.course',
          },
        },
      },
    },
    {
      $addFields: {
        isPreRequisiteFullFiled: {
          $or: [
            {
              $eq: ['$course.preRequisiteCourses', []],
            },
            {
              $setIsSubset: [
                '$course.preRequisiteCourses.course',
                '$completedCoursesIds',
              ],
            },
          ],
        },
      },
    },
    {
      $addFields: {
        isAlreadyEnrolled: {
          $in: [
            '$course._id',
            {
              $map: {
                input: '$enrolledCourses',
                as: 'enrolledCourse',
                in: '$$enrolledCourse.course',
              },
            },
          ],
        },
      },
    },
    {
      $match: {
        isAlreadyEnrolled: false,
        isPreRequisiteFullFiled: true,
      },
    },
  ];
  const paginationQuery = [
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];

  const result = await OfferedCourse.aggregate([
    ...aggregationQuery,
    ...paginationQuery,
  ]);
  const total = (await OfferedCourse.aggregate(aggregationQuery)).length;
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    result,
  };
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found');
  }
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
  getMyOfferedCourseFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  deleteOfferedCourseFromDB,
};

export default OfferedCourseServices;
