import { z } from 'zod';

const createEnrolledCourseValidationZodSchema = z.object({
  body: z.object({
    offeredCourse: z.string({
      required_error: 'Offered course is required',
      invalid_type_error: 'Offered course must be a string',
    }),
  }),
});

const updateEnrolledCourseMarksValidationZodSchema = z.object({
  body: z.object({
    semesterRegistration: z.string({
      required_error: 'Semester registration is required',
      invalid_type_error: 'Semester registration must be a string',
    }),
    offeredCourse: z.string({
      required_error: 'Offered course is required',
      invalid_type_error: 'Offered course must be a string',
    }),
    student: z.string({
      required_error: 'Student is required',
      invalid_type_error: 'Student must be a string',
    }),
    courseMarks: z.object({
      classTest1: z.number().optional(),
      midTerm: z.number().optional(),
      classTest2: z.number().optional(),
      finalTerm: z.number().optional(),
    }),
  }),
});

export const EnrolledCourseValidations = {
  createEnrolledCourseValidationZodSchema,
  updateEnrolledCourseMarksValidationZodSchema,
};
