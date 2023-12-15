import { z } from 'zod';
import { Days } from './offeredCourse.constant';

const createOfferCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string({
      required_error: 'Semester registration is required',
      invalid_type_error: 'Semester registration must be a string',
    }),
    academicSemester: z.string({
      required_error: 'Academic semester is required',
      invalid_type_error: 'Academic semester must be a string',
    }),
    academicFaculty: z.string({
      required_error: 'Academic faculty is required',
      invalid_type_error: 'Academic faculty must be a string',
    }),
    academicDepartment: z.string({
      required_error: 'Academic department is required',
      invalid_type_error: 'Academic department must be a string',
    }),
    course: z.string({
      required_error: 'Course is required',
      invalid_type_error: 'Course must be a string',
    }),
    faculty: z.string({
      required_error: 'Faculty is required',
      invalid_type_error: 'Faculty must be a string',
    }),
    maxCapacity: z.number({
      required_error: 'Max capacity is required',
      invalid_type_error: 'Max capacity must be a number',
    }),
    section: z.string({
      required_error: 'Section is required',
      invalid_type_error: 'Section must be a string',
    }),
    days: z.enum([...Days] as [string, ...string[]], {
      required_error: 'Days is required',
      invalid_type_error: 'Days must be a string',
    }),
    startTime: z.string({
      required_error: 'Start time is required',
      invalid_type_error: 'Start time must be a string',
    }),
    endTime: z.string({
      required_error: 'End time is required',
      invalid_type_error: 'End time must be a string',
    }),
  }),
});

const offeredCourseValidations = {
  createOfferCourseValidationSchema,
};

export default offeredCourseValidations;
