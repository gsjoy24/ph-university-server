import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicFacultySearchableFields } from './academicFaculty.constant';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultiesFromDB = async (
  query: Record<string, unknown>,
) => {
  const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
    .search(AcademicFacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicFacultyQuery.modelQuery;
  const meta = await academicFacultyQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  // check if academic faculty exists
  const result = await AcademicFaculty.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found');
  }
  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  // check if academic faculty exists
  const academicFaculty = await AcademicFaculty.findById(id);
  if (!academicFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found');
  }
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteAcademicFacultyFromDB = async (id: string) => {
  // check if academic faculty exists
  const academicFaculty = await AcademicFaculty.findById(id);
  if (!academicFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found');
  }

  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
  deleteAcademicFacultyFromDB,
};
