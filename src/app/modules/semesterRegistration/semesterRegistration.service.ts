import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const semesterRegistration = await SemesterRegistration.create(payload);
  return semesterRegistration;
};

const getAllSemesterRegistrationFromDB = async () => {
  const semesterRegistration = await SemesterRegistration.find();
  return semesterRegistration;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const semesterRegistration = await SemesterRegistration.findOne({ _id: id });
  return semesterRegistration;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const semesterRegistration = await SemesterRegistration.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return semesterRegistration;
};

export const semesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
