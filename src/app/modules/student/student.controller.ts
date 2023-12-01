import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students data retrieved successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentsFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student data retrieved successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentsFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
};
