import { z } from 'zod';
import { Days } from './offeredCourse.constant';
const timeStringSchema = z
  .string({
    required_error: 'Start time and end time is required',
    invalid_type_error: 'Start time and end time must be a string',
  })
  .refine(
    (time) => {
      const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      return regex.test(time);
    },
    {
      message: 'The time must be in hh:mm format (00:00 - 23:59)',
    },
  );

const createOfferCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string({
        required_error: 'Semester registration is required',
        invalid_type_error: 'Semester registration must be a string',
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
      days: z.array(z.enum([...Days] as [string, ...string[]]), {
        required_error: 'Days is required',
        invalid_type_error: 'Days must be an array',
      }),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      ({ startTime, endTime }) => {
        const start = new Date(`2003-03-24T${startTime}:00`);
        const end = new Date(`2003-03-24T${endTime}:00`);
        return start < end;
      },
      {
        message: 'Start time must be before end time',
      },
    ),
});

const updateOfferCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string({
        invalid_type_error: 'Faculty must be a string',
        required_error: 'Faculty is required',
      }),
      maxCapacity: z.number({
        invalid_type_error: 'Max capacity must be a number',
        required_error: 'Max capacity is required',
      }),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      ({ startTime, endTime }) => {
        const start = new Date(`2003-03-24T${startTime}:00`);
        const end = new Date(`2003-03-24T${endTime}:00`);
        return start < end;
      },
      {
        message: 'Start time must be before end time',
      },
    ),
});

const offeredCourseValidations = {
  createOfferCourseValidationSchema,
  updateOfferCourseValidationSchema,
};

export default offeredCourseValidations;
