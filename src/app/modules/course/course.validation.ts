import { z } from 'zod';

const PreRequisiteCoursesValidationSchema = z.object({
  body: z.object({
    course: z.string(),
    isDeleted: z.boolean().optional(),
  }),
});

const CourseValidationSchema = z.object({
  body: z.object({
    body: z.object({
      title: z.string({
        required_error: 'Course title is required',
        invalid_type_error: 'Course title must be a string',
      }),
      prefix: z.string({
        required_error: 'Course prefix is required',
        invalid_type_error: 'Course prefix must be a string',
      }),
      code: z.number({
        required_error: 'Course code is required',
        invalid_type_error: 'Course code must be a number',
      }),
      credit: z.number({
        required_error: 'Course credit is required',
        invalid_type_error: 'Course credit must be a number',
      }),
      preRequisiteCourses: z
        .array(PreRequisiteCoursesValidationSchema)
        .optional(),
    }),
  }),
});

export const courseValidations = {
  CourseValidationSchema,
  PreRequisiteCoursesValidationSchema,
};
