export type TLoginUser = {
  userId: string;
  password: string;
};

export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type TResetPassword = {
  userId: string;
  newPassword: string;
};
