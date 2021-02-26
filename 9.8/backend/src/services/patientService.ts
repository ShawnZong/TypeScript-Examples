import patientData from "../../data/patients";

import { Patient } from "../types";

const getAllPatients = (): Omit<Patient, "ssn">[] => {
  const tmpPatientData = patientData;

  return tmpPatientData.map((patient) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...usefulData } = patient;
    return usefulData;
  });
};

export default { getAllPatients };
