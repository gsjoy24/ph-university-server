import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateId } from './user.utils';
const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a new user object
  const userData: Partial<TUser> = {};
  userData.role = 'student';
  userData.password = password || (config.default_password as string);

  // find semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  userData.id = await generateId(admissionSemester as TAcademicSemester);

  // create a user on db
  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id; //reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
