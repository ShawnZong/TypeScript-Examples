/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NewPatient, Gender, Entry } from "./types";

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
    throw new Error("input wrong, not a gender " + name);
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

export { toNewPatientEntry };
