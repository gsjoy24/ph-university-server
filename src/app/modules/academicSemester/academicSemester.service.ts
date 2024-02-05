import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  const { name, code } = payload;
  if (AcademicSemesterNameCodeMapper[name] !== code) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester not found');
  }
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  // check if academic semester exists
  const academicSemester = await AcademicSemester.findById(id);
  if (!academicSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester not found');
  }
  const result = await AcademicSemester.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteAcademicSemesterFromDB = async (id: string) => {
  // check if academic semester exists
  const academicSemester = await AcademicSemester.findById(id);
  if (!academicSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester not found');
  }
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
  deleteAcademicSemesterFromDB,
};
