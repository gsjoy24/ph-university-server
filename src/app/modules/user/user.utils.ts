import { TAcademicSemester } from '../academicSemester/academicSemester.interface';

export const generateId = (payload: TAcademicSemester) => {
  const currentId = (0).toString();
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(4, '0');
  return `${payload.year}${payload.code}${incrementedId}`;
};
