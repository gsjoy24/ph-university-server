import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { registrationStatus } from './semesterRegistration.constant';

// ! create semester registration
const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // check if there is any upcoming or ongoing semester
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: registrationStatus.UPCOMING },
        { status: registrationStatus.ONGOING },
      ],
    });
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.CONFLICT,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester?.status} registered semester`,
    );
  }

  // check if semester registration already exist
  const isSemesterRegistrationAlreadyExist = await SemesterRegistration.findOne(
    {
      academicSemester,
    },
  );
  if (isSemesterRegistrationAlreadyExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Semester registration already exist',
    );
  }
  // check if the academic semester exist
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found');
  }

  const semesterRegistration = await SemesterRegistration.create(payload);
  return semesterRegistration;
};

// ! get all semester registration
const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistration = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistration.modelQuery;
  return result;
};

// ! get single semester registration
const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const semesterRegistration =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return semesterRegistration;
};

// ! update semester registration
const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // check if the semester registration exist
  const requestedSemester = await SemesterRegistration.findById(id);
  if (!requestedSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found');
  }

  // check if the semester registration is already ended
  if (requestedSemester?.status === registrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You can not update status of ended semester registration',
    );
  }

  // check if the requested semester is upcoming or ongoing and new status is ended or upcoming from ongoing or upcoming from ended
  if (
    requestedSemester?.status === registrationStatus.UPCOMING &&
    payload?.status === registrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You can not set status to ended from upcoming',
    );
  } else if (
    requestedSemester?.status === registrationStatus.ONGOING &&
    payload?.status === registrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You can not set status to upcoming from ongoing',
    );
  }

  const semesterRegistration = await SemesterRegistration.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );
  return semesterRegistration;
};

export const semesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
