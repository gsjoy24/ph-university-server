import { z } from 'zod';
import { BloodGroup, Gender } from './faculty.constant';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First Name is required',
      invalid_type_error: 'First Name must be a string',
    })
    .min(1, {
      message: 'First Name must be at least 1 character',
    })
    .max(20, {
      message: 'First Name can not be more than 20 characters',
    })
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z
    .string({
      invalid_type_error: 'Middle Name must be a string',
    })
    .optional(),
  lastName: z.string({
    required_error: 'Last Name is required',
    invalid_type_error: 'Last Name must be a string',
  }),
});

export const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    facultyData: z.object({
      designation: z.string(),
      name: createUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z
        .string({
          invalid_type_error: 'Date of Birth must be a string',
        })
        .optional(),
      email: z
        .string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be a string',
        })
        .email({
          message: 'Email must be a valid email address',
        }),
      contactNo: z.string({
        required_error: 'Contact No is required',
        invalid_type_error: 'Contact No must be a string',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact No is required',
        invalid_type_error: 'Emergency Contact No must be a string',
      }),
      bloodGroup: z
        .enum([...BloodGroup] as [string, ...string[]], {})
        .optional(),
      presentAddress: z.string({
        required_error: 'Present Address is required',
        invalid_type_error: 'Present Address must be a string',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address is required',
        invalid_type_error: 'Permanent Address must be a string',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is required',
        invalid_type_error: 'Academic Department must be a string',
      }),
      profileImg: z.string({
        required_error: 'Profile Image is required',
        invalid_type_error: 'Profile Image must be a string',
      }),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First Name must be at least 1 character' })
    .max(20, { message: 'First Name can not be more than 20 characters' })
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string({
      invalid_type_error: 'Last Name must be a string',
    })
    .optional(),
});

export const updateFacultyValidationSchema = z.object({
  body: z.object({
    facultyData: z.object({
      designation: z
        .string({
          invalid_type_error: 'Designation must be a string',
        })
        .optional(),
      name: updateUserNameValidationSchema,
      gender: z
        .enum([...Gender] as [string, ...string[]], {
          invalid_type_error: 'Gender must be a string',
        })
        .optional(),
      dateOfBirth: z
        .string({
          invalid_type_error: 'Date of Birth must be a string',
        })
        .optional(),
      email: z
        .string({
          invalid_type_error: 'Email must be a string',
        })
        .email({
          message: 'Email must be a valid email address',
        })
        .optional(),
      contactNo: z
        .string({
          invalid_type_error: 'Contact No must be a string',
        })
        .optional(),
      emergencyContactNo: z
        .string({
          invalid_type_error: 'Emergency Contact No must be a string',
        })
        .optional(),
      bloodGroup: z
        .enum([...BloodGroup] as [string, ...string[]], {
          invalid_type_error: 'Blood Group must be a string',
        })
        .optional(),
      presentAddress: z
        .string({
          invalid_type_error: 'Present Address must be a string',
        })
        .optional(),
      permanentAddress: z
        .string({
          invalid_type_error: 'Permanent Address must be a string',
        })
        .optional(),
      profileImg: z
        .string({
          invalid_type_error: 'Profile Image must be a string',
        })
        .optional(),
      academicDepartment: z
        .string({
          invalid_type_error: 'Academic Department must be a string',
        })
        .optional(),
    }),
  }),
});

export const studentValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
