import { TUserRole } from '../user/user.interface';
import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { id: string; role: TUserRole },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};
