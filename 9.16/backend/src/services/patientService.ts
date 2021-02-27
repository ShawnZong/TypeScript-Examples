// source data
import patientData from "../../data/patients";

// type
import { Patient, NewPatient } from "../types";

// utils
import { v1 as uuid } from "uuid";

const getAllPatients = (): Patient[] => {
  return patientData;
  // const tmpPatientData = patientData;

  // return tmpPatientData.map((patient) => {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   // const { ssn, ...usefulData } = patient;
  //   return usefulData;
  // });
};

const findPatient = (searchID: string): Patient | undefined => {
  const patient = patientData.find((tmp) => tmp.id === searchID);
  return patient;
};

const addPatient = (input: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...input,
  };
  patientData.push(newPatient);
  return newPatient;
};

export default { getAllPatients, addPatient, findPatient };
