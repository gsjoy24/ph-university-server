import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';

const loginUser = catchAsync(async (req, res) => {
  const result = AuthServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
};