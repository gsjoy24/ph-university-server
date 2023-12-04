import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  type TAcademicSemesterNameCodeMapper = {
    [key: string]: string;
  };
  const AcademicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: '01',
    Summer: '01',
    Fall: '03',
  };

  const { name, code } = payload;
  if (AcademicSemesterNameCodeMapper[name] !== code) {
    throw new Error('Invalid semester code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
