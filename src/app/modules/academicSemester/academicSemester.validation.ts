import zod from 'zod';
import {
  AcademicSemesterCodes,
  AcademicSemesterNames,
  Months,
} from './academicSemester.constant';

const createAcademicSemesterValidationSchema = zod.object({
  body: zod.object({
    name: zod.enum([...AcademicSemesterNames] as [string, ...string[]], {
      required_error: 'Academic semester name is required',
    }),
    year: zod.string({
      required_error: 'Academic semester year is required',
    }),
    code: zod.enum([...AcademicSemesterCodes] as [string, ...string[]], {
      required_error: 'Academic semester code is required',
    }),
    startMonth: zod.enum([...Months] as [string, ...string[]], {
      required_error: 'Academic semester start month is required',
    }),
    endMonth: zod.enum([...Months] as [string, ...string[]], {
      required_error: 'Academic semester end month is required',
    }),
  }),
});

export const AcademicSemesterValidations = {
  createAcademicSemesterValidationSchema,
};
