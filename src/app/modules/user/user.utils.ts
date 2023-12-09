import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId(); // 2020 02 0003

  const lastStudentSemesterYear = lastStudentId?.substring(0, 4); // 2020
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); // 02
  const currentYear = payload.year; // 2020
  const currentCode = payload.code; // 02

  if (
    lastStudentId &&
    lastStudentSemesterYear === currentYear &&
    lastStudentSemesterCode === currentCode
  ) {
    currentId = lastStudentId.substring(6);
  }

  const incrementedId = (Number(currentId) + 1).toString().padStart(4, '0');

  return `${payload.year}${payload.code}${incrementedId}`;
};
