import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a new user object
  const userData: Partial<TUser> = {};
  userData.id = '2030100001';
  userData.role = 'student';
  userData.password = password || (config.default_password as string);

  // create a user on db
  const newUser = await User.create(userData);
  if (Object.keys(newUser)) {
    studentData.id = newUser.id;
    studentData.user = newUser._id; //reference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
