import { z } from 'zod';

export const AcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Academic department name is required',
      invalid_type_error: 'Academic department name must be a string',
    }),
    academicFaculty: z.string({
      required_error: 'Academic faculty is required',
      invalid_type_error: 'Academic faculty must be a string',
    }),
  }),
});
