import Joi from 'joi';
const nameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .pattern(/^[A-Z][a-z]*$/)
    .messages({
      'string.base': 'First name must be a string',
      'string.empty': 'First name cannot be empty',
      'string.max': 'First name cannot exceed {#limit} characters',
      'string.pattern.base':
        'First name should start with a capital letter and contain only letters',
    }),
  middleName: Joi.string().trim().max(20).messages({
    'string.base': 'Middle name must be a string',
    'string.max': 'Middle name cannot exceed {#limit} characters',
  }),
  lastName: Joi.string()
    .trim()
    .max(20)
    .pattern(/^[A-Za-z]+$/)
    .messages({
      'string.base': 'Last name must be a string',
      'string.empty': 'Last name cannot be empty',
      'string.max': 'Last name cannot exceed {#limit} characters',
      'string.pattern.base': 'Last name should contain only letters',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'string.base': "Father's name must be a string",
    'any.required': "Father's name is required",
    'string.empty': "Father's name cannot be empty",
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'string.base': "Father's occupation must be a string",
    'any.required': "Father's occupation is required",
    'string.empty': "Father's occupation cannot be empty",
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    'string.base': "Father's contact no must be a string",
    'any.required': "Father's contact no is required",
    'string.empty': "Father's contact no cannot be empty",
  }),
  motherName: Joi.string().trim().required().messages({
    'string.base': "Mother's name must be a string",
    'any.required': "Mother's name is required",
    'string.empty': "Mother's name cannot be empty",
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'string.base': "Mother's occupation must be a string",
    'any.required': "Mother's occupation is required",
    'string.empty': "Mother's occupation cannot be empty",
  }),
  motherContactNo: Joi.string().trim().required().messages({
    'string.base': "Mother's contact no must be a string",
    'any.required': "Mother's contact no is required",
    'string.empty': "Mother's contact no cannot be empty",
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.base': "Local guardian's name must be a string",
    'any.required': "Local guardian's name is required",
    'string.empty': "Local guardian's name cannot be empty",
  }),
  occupation: Joi.string().trim().required().messages({
    'string.base': "Local guardian's occupation must be a string",
    'any.required': "Local guardian's occupation is required",
    'string.empty': "Local guardian's occupation cannot be empty",
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.base': "Local guardian's contact no must be a string",
    'any.required': "Local guardian's contact no is required",
    'string.empty': "Local guardian's contact no cannot be empty",
  }),
  address: Joi.string().trim().required().messages({
    'string.base': "Local guardian's address must be a string",
    'any.required': "Local guardian's address is required",
    'string.empty': "Local guardian's address cannot be empty",
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    'string.base': 'ID must be a string',
    'any.required': 'ID is required',
    'string.empty': 'ID cannot be empty',
  }),
  name: nameValidationSchema.required().messages({
    'object.base': 'Name must be an object',
    'any.required': 'Name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': "Gender can be only 'male', 'female', or 'other'",
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required().trim().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email is not valid',
    'any.required': 'Email is required',
    'string.empty': 'Email cannot be empty',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.base': 'Contact number must be a string',
    'any.required': 'Contact number is required',
    'string.empty': 'Contact number cannot be empty',
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    'string.base': 'Emergency contact number must be a string',
    'any.required': 'Emergency contact number is required',
    'string.empty': 'Emergency contact number cannot be empty',
  }),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().trim().required().messages({
    'string.base': 'Present address must be a string',
    'any.required': 'Present address is required',
    'string.empty': 'Present address cannot be empty',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'string.base': 'Permanent address must be a string',
    'any.required': 'Permanent address is required',
    'string.empty': 'Permanent address cannot be empty',
  }),
  guardian: guardianValidationSchema.required().messages({
    'object.base': 'Guardian must be an object',
    'any.required': 'Guardian details are required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'object.base': 'Local guardian must be an object',
    'any.required': 'Local guardian details are required',
  }),
  profileImg: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
