import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  const isSemesterRegistrationAlreadyExist = await SemesterRegistration.findOne(
    {
      academicSemester,
    },
  );
  if (!isSemesterRegistrationAlreadyExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Semester registration already exist',
    );
  }
  // check if academic semester exist
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found');
  }

  const semesterRegistration = await SemesterRegistration.create(payload);
  return semesterRegistration;
};

const getAllSemesterRegistrationFromDB = async () => {
  const semesterRegistration = await SemesterRegistration.find();
  return semesterRegistration;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const semesterRegistration = await SemesterRegistration.findOne({ _id: id });
  return semesterRegistration;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const semesterRegistration = await SemesterRegistration.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
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
