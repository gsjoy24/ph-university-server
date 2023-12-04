import { AcademicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  const { name, code } = payload;
  if (AcademicSemesterNameCodeMapper[name] !== code) {
    throw new Error('Invalid semester code');
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
  return result;
};
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
};
