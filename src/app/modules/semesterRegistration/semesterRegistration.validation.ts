import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

const semesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string({
      required_error: 'Academic semester is required',
      invalid_type_error: 'Academic semester must be a string',
    }),
    status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])], {
      required_error: 'Status is required',
      invalid_type_error: 'Status must be a string',
    }),
    startDate: z
      .string({
        required_error: 'Start date is required',
        invalid_type_error: 'Start date must be a string',
      })
      .datetime(),
    endDate: z
      .string({
        required_error: 'End date is required',
        invalid_type_error: 'End date must be a string',
      })
      .datetime(),
    minCredit: z.number({
      required_error: 'Minimum credit is required',
      invalid_type_error: 'Minimum credit must be a number',
    }),
    maxCredit: z.number({
      required_error: 'Maximum credit is required',
      invalid_type_error: 'Maximum credit must be a number',
    }),
  }),
});

export const semesterRegistrationValidations = {
  semesterRegistrationValidationSchema,
};
