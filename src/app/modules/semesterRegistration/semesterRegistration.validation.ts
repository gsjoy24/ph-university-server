import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationValidationSchema = z.object({
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

const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z
      .string({
        invalid_type_error: 'Academic semester must be a string',
      })
      .nonempty({
        message: 'Academic semester cannot be empty',
      })
      .optional(),
    status: z
      .enum([...(SemesterRegistrationStatus as [string, ...string[]])])
      .optional(),
    startDate: z
      .string({
        invalid_type_error: 'Start date must be a string',
      })
      .datetime()
      .nonempty({
        message: 'Start date cannot be empty',
      })
      .optional(),
    endDate: z
      .string({
        invalid_type_error: 'End date must be a string',
      })
      .datetime()
      .nonempty({
        message: 'End date cannot be empty',
      })
      .optional(),
    minCredit: z
      .number({
        invalid_type_error: 'Minimum credit must be a number',
      })
      .optional(),
    maxCredit: z
      .number({
        invalid_type_error: 'Maximum credit must be a number',
      })
      .optional(),
  }),
});

export const semesterRegistrationValidations = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
};
