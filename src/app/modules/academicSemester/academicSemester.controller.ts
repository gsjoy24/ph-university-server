import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester created successfully!',
    data: result,
  });
});
const getAllAcademicSemesters: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semesters data retrieved successfully!',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester data retrieved successfully!',
    data: result,
  });
});
export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
};
