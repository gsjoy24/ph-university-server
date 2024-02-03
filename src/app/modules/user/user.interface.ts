/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLES } from './user.constant';

export interface TUser {
  id: string;
  email: string;
  password: string;
  needsPasswordChange?: boolean;
  passwordChangedAt?: Date;
  role: 'superAdmin' | 'admin' | 'faculty' | 'student';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export type NewUser = {
  id: string;
  role: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser | null>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJwtIssuedBeforePasswordChanged(
    passwordChangedAt: Date,
    jwtIssuedAt: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLES;
