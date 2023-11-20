import { StudentModel } from '../student.model';
import { Student } from './student.interface';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  console.log(result);
  return result;
};
const getSingleStudentsFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  console.log(result);
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
};
