import { z } from 'zod';
// Define the userName schema
const userNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    })
    .max(20)
    .regex(/^[A-Z][a-z]*$/, {
      message:
        'First name should start with a capital letter and contain only letters',
    }),
  middleName: z
    .string({
      required_error: 'Middle name is required',
      invalid_type_error: 'Middle name must be a string',
    })
    .max(20, { message: 'Middle name should not be more than 20 characters' })
    .optional(),
  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    })
    .max(20, { message: 'Last name should not be more than 20 characters' })
    .regex(/^[a-zA-Z]+$/, {
      message: 'Last name should contain only letters',
    }),
});

const UpdateUserNameValidationSchema = z.object({
  firstName: z
    .string({
      invalid_type_error: 'First name must be a string',
    })
    .max(20)
    .regex(/^[A-Z][a-z]*$/, {
      message:
        'First name should start with a capital letter and contain only letters',
    })
    .optional(), // Making firstName optional
  middleName: z
    .string({
      invalid_type_error: 'Middle name must be a string',
    })
    .max(20, { message: 'Middle name should not be more than 20 characters' })
    .regex(/^[A-Z][a-z]*$/, {
      message:
        'Middle name should start with a capital letter and contain only letters',
    })
    .optional(), // Making middleName optional
  lastName: z
    .string({
      invalid_type_error: 'Last name must be a string',
    })
    .max(20, { message: 'Last name should not be more than 20 characters' })
    .regex(/^[A-Z][a-z]*$/, {
      message:
        'Last name should start with a capital letter and contain only letters',
    })
    .optional(), // Making lastName optional
});

// Define guardian schema
const guardianValidationSchema = z.object({
  fatherName: z.string({
    required_error: 'Father name is required',
    invalid_type_error: 'Father name must be a string',
  }),
  fatherOccupation: z.string({
    required_error: 'Father occupation is required',
    invalid_type_error: 'Father occupation must be a string',
  }),
  fatherContactNo: z.string({
    required_error: 'Father contact number is required',
    invalid_type_error: 'Father contact number must be a string',
  }),
  motherName: z.string({
    required_error: 'Mother name is required',
    invalid_type_error: 'Mother name must be a string',
  }),
  motherOccupation: z.string({
    required_error: 'Mother occupation is required',
    invalid_type_error: 'Mother occupation must be a string',
  }),
  motherContactNo: z.string({
    required_error: 'Mother contact number is required',
    invalid_type_error: 'Mother contact number must be a string',
  }),
});

const UpdateGuardianValidationSchema = z.object({
  fatherName: z
    .string({
      invalid_type_error: 'Father name must be a string',
    })
    .max(50)
    .regex(/^[A-Za-z\s]+$/, {
      message: 'Father name should contain only letters and spaces',
    })
    .optional(),
  fatherOccupation: z
    .string({
      invalid_type_error: 'Father occupation must be a string',
    })
    .max(50)
    .regex(/^[A-Za-z\s]+$/, {
      message: 'Father occupation should contain only letters and spaces',
    })
    .optional(),
  fatherContactNo: z
    .string({
      invalid_type_error: 'Father contact number must be a string',
    })
    .max(15)
    .regex(/^\d+$/, {
      message: 'Father contact number should contain only digits',
    })
    .optional(),
  motherName: z
    .string({
      invalid_type_error: 'Mother name must be a string',
    })
    .max(50)
    .regex(/^[A-Za-z\s]+$/, {
      message: 'Mother name should contain only letters and spaces',
    })
    .optional(),
  motherOccupation: z
    .string({
      invalid_type_error: 'Mother occupation must be a string',
    })
    .max(50)
    .regex(/^[A-Za-z\s]+$/, {
      message: 'Mother occupation should contain only letters and spaces',
    })
    .optional(),
  motherContactNo: z
    .string({
      invalid_type_error: 'Mother contact number must be a string',
    })
    .max(15)
    .regex(/^\d+$/, {
      message: 'Mother contact number should contain only digits',
    })
    .optional(),
});

// Define localGuardian schema
const localGuardianValidationSchema = z.object({
  name: z.string({
    required_error: 'Local guardian name is required',
    invalid_type_error: 'Local guardian name must be a string',
  }),
  occupation: z.string({
    required_error: 'Local guardian occupation is required',
    invalid_type_error: 'Local guardian occupation must be a string',
  }),
  contactNo: z.string({
    required_error: 'Local guardian contact number is required',
    invalid_type_error: 'Local guardian contact number must be a string',
  }),
  address: z.string({
    required_error: 'Local guardian address is required',
    invalid_type_error: 'Local guardian address must be a string',
  }),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Local guardian name must be a string',
    })
    .max(50)
    .regex(/^[A-Za-z\s]+$/, {
      message: 'Local guardian name should contain only letters and spaces',
    })
    .optional(),
  occupation: z
    .string({
      invalid_type_error: 'Local guardian occupation must be a string',
    })
    .max(50)
    .regex(/^[A-Za-z\s]+$/, {
      message:
        'Local guardian occupation should contain only letters and spaces',
    })
    .optional(),
  contactNo: z
    .string({
      invalid_type_error: 'Local guardian contact number must be a string',
    })
    .max(15)
    .regex(/^\d+$/, {
      message: 'Local guardian contact number should contain only digits',
    })
    .optional(),
  address: z
    .string({
      invalid_type_error: 'Local guardian address must be a string',
    })
    .max(100)
    .optional(),
});

// Define student schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    }),
    studentData: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        required_error: 'Gender is required',
        invalid_type_error: 'Gender must be a string',
      }),
      dateOfBirth: z
        .string({
          invalid_type_error: 'Date of birth must be a string',
        })
        .optional(),
      email: z
        .string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be a string',
        })
        .email({
          message: 'Invalid email address',
        }),
      contactNo: z.string({
        required_error: 'Contact number is required',
        invalid_type_error: 'Contact number must be a string',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
        invalid_type_error: 'Emergency contact number must be a string',
      }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
          invalid_type_error: 'Blood group must be a string',
        })
        .optional(),
      presentAddress: z.string({
        required_error: 'Present address is required',
        invalid_type_error: 'Present address must be a string',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
        invalid_type_error: 'Permanent address must be a string',
      }),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().url({ message: 'Invalid url' }).optional(),
      admissionSemester: z.string({
        required_error: 'Academic semester is required',
        invalid_type_error: 'Academic semester must be a string',
      }),
    }),
  }),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .optional(),

    studentData: z.object({
      name: UpdateUserNameValidationSchema.optional(),

      gender: z
        .enum(['male', 'female', 'other'], {
          invalid_type_error: 'Gender must be a string',
        })
        .optional(),

      dateOfBirth: z
        .string({
          invalid_type_error: 'Date of birth must be a string',
        })
        .optional(),

      email: z
        .string({
          invalid_type_error: 'Email must be a string',
        })
        .email({
          message: 'Invalid email address',
        })
        .optional(),

      contactNo: z
        .string({
          invalid_type_error: 'Contact number must be a string',
        })
        .optional(),

      emergencyContactNo: z
        .string({
          invalid_type_error: 'Emergency contact number must be a string',
        })
        .optional(),

      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
          invalid_type_error: 'Blood group must be a string',
        })
        .optional(),

      presentAddress: z
        .string({
          invalid_type_error: 'Present address must be a string',
        })
        .optional(),

      permanentAddress: z
        .string({
          invalid_type_error: 'Permanent address must be a string',
        })
        .optional(),

      guardian: UpdateGuardianValidationSchema.optional(),

      localGuardian: updateLocalGuardianValidationSchema.optional(),

      profileImg: z.string().url({ message: 'Invalid url' }).optional(),

      admissionSemester: z
        .string({
          invalid_type_error: 'Academic semester must be a string',
        })
        .optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
