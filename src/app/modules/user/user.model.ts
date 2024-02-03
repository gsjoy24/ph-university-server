import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { UserStatus } from './user.constant';
import { TUser, UserModel } from './user.interface';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: [true, 'Id is required!'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: Date,
    role: {
      type: String,
      enum: ['superAdmin', 'admin', 'faculty', 'student'],
    },
    status: {
      type: String,
      enum: UserStatus,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

//! pre save middleware/hook || hashing password
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

//! post save middleware/hook
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await this.findOne({ id }).select('+password');
};

userSchema.statics.isJwtIssuedBeforePasswordChanged = function (
  passwordChangedAt: Date,
  jwtIssuedAt: number,
) {
  const passwordChangedAtTime = passwordChangedAt.getTime() / 1000;
  return passwordChangedAtTime > jwtIssuedAt;
};

userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
