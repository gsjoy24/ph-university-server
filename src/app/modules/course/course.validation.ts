import { z } from 'zod';

const PreRequisiteCoursesValidationSchema = z.object({
  course: z.string({
    invalid_type_error: 'Course must be a string',
  }),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
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
    credits: z.number({
      required_error: 'Course credit is required',
      invalid_type_error: 'Course credit must be a number',
    }),
    preRequisiteCourses: z
      .array(PreRequisiteCoursesValidationSchema)
      .optional(),
  }),
  isDeleted: z.boolean().optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Course title is required',
        invalid_type_error: 'Course title must be a string',
      })
      .optional(),
    prefix: z
      .string({
        required_error: 'Course prefix is required',
        invalid_type_error: 'Course prefix must be a string',
      })
      .optional(),
    code: z
      .number({
        required_error: 'Course code is required',
        invalid_type_error: 'Course code must be a number',
      })
      .optional(),
    credits: z
      .number({
        required_error: 'Course credit is required',
        invalid_type_error: 'Course credit must be a number',
      })
      .optional(),
    preRequisiteCourses: z
      .array(PreRequisiteCoursesValidationSchema)
      .optional(),
  }),
  isDeleted: z.boolean().optional(),
});

const facultiesWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const courseValidations = {
  createCourseValidationSchema,
  PreRequisiteCoursesValidationSchema,
  updateCourseValidationSchema,
  facultiesWithCourseValidationSchema,
};
