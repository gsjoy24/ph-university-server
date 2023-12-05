import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Academic faculty name is required',
      invalid_type_error: 'Academic faculty name must be a string',
    }),
  }),
});

export const AcademicFacultyValidations = {
  academicFacultyValidationSchema,
};
