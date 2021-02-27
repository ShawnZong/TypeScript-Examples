/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// types
import {
  NewPatient,
  Gender,
  Entry,
  BaseEntry,
  Discharged,
  HospitalEntry,
  OccupationalHealthcareEntry,
  SickLeave,
  HealthCheckEntry,
  HealthCheckRating,
} from "./types";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isArray = (input: any): input is Entry[] => {
  return typeof input === "object";
};
const parseEntry = (input: any): Entry[] => {
  if (!input || !isArray(input)) {
    throw new Error("input wrong, not an array " + input);
  }
  return input;
};
const isString = (input: any): input is string => {
  return typeof input === "string" || input instanceof String;
};

const parseString = (input: any): string => {
  if (!input || !isString(input)) {
    throw new Error("input wrong, not a string " + input);
  }
  return input;
};

const isDate = (input: any): boolean => {
  return Boolean(Date.parse(input));
};

const parseDate = (input: any): string => {
  if (!input || !isString(input) || !isDate(input)) {
    throw new Error("input wrong, not a date " + input);
  }
  return input;
};

const isGender = (input: any): input is Gender => {
  return Object.values(Gender).includes(input);
};

const parseGender = (input: any): Gender => {
  if (!input || !isGender(input)) {
    throw new Error("input wrong, not a gender " + input);
  }
  return input;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (input: any): NewPatient => {
  return {
    name: parseString(input.name),
    dateOfBirth: parseDate(input.dateOfBirth),
    ssn: parseString(input.ssn),
    gender: parseGender(input.gender),
    occupation: parseString(input.occupation),
    entries: parseEntry(input.entries),
  };
};

const parseDiagnosisCodes = (input: string[]): string[] => {
  if (!input) {
    return [];
  }
  return input;
};

const parseDischarge = (input: any): Discharged => {
  if (!input || !isString(input.data) || !isString(input.criteria)) {
    throw new Error("input wrong, not a  Discharged" + input);
  }
  return {
    date: parseDate(input.date),
    criteria: parseString(input.criteria),
  };
};

const parseSickLeave = (input: any): SickLeave => {
  if (!input || !isDate(input.startDate) || !isDate(input.endDate)) {
    throw new Error("input wrong, not a  SickLeave" + input);
  }
  return {
    startDate: parseDate(input.startDate),
    endDate: parseDate(input.endDate),
  };
};

const isHealthCheckRating = (input: any): input is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(input);
};

const parseHealthCheckRating = (input: any): HealthCheckRating => {
  if (isNaN(input) || !isHealthCheckRating(input)) {
    throw new Error("input wrong, not a  HealthCheckRating" + input);
  }
  return input;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewEntry = (input: any): Omit<Entry, "id"> => {
  const baseEntry: Omit<BaseEntry, "id"> = {
    description: parseString(input.description),
    date: parseDate(input.date),
    specialist: parseString(input.specialist),
    diagnosisCodes: parseDiagnosisCodes(input.diagnosisCodes),
  };

  switch (input.type) {
    case "HealthCheck":
      const healthCheckEntry: Omit<HealthCheckEntry, "id"> = {
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(input.healthCheckRating),
        ...baseEntry,
      };
      return healthCheckEntry;
    case "Hospital":
      const hospitalEntry: Omit<HospitalEntry, "id"> = {
        type: "Hospital",
        discharge: parseDischarge(input.discharge),
        ...baseEntry,
      };
      return hospitalEntry;
    case "OccupationalHealthcare":
      const occupationalEntry: Omit<OccupationalHealthcareEntry, "id"> = {
        type: "OccupationalHealthcare",
        employerName: parseString(input.employerName),
        sickLeave: parseSickLeave(input.sickLeave),
        ...baseEntry,
      };
      return occupationalEntry;

    default:
      throw new Error("invalid entry type");
  }
};

export { toNewPatientEntry };
