import config from '../config';
import { USER_ROLES } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';

const superAdmin = {
  id: '0001',
  email: 'gour.joy24@gmail.com',
  password: config.super_admin_password,
  role: USER_ROLES.superAdmin,
  needsPasswordChange: false,
  status: 'in-progress',
};
const seedSuperAdmin = async () => {
  const isSuperAdminExists = await User.findOne({
    role: USER_ROLES.superAdmin,
  });
  if (!isSuperAdminExists) {
    await User.create(superAdmin);
  }
};

export default seedSuperAdmin;
