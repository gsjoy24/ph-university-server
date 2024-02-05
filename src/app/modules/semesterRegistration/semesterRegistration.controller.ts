import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { semesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationService.createSemesterRegistrationIntoDB(
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration created successfully!',
    data: result,
  });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const { meta, result } =
    await semesterRegistrationService.getAllSemesterRegistrationFromDB(
      req.query,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration data retrieved successfully!',
    meta,
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationService.getSingleSemesterRegistrationFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration data retrieved successfully!',
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationService.updateSemesterRegistrationIntoDB(
      id,
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration updated successfully!',
    data: result,
  });
});

export const semesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
