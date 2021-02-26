"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientEntry = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const types_1 = require("./types");
const isString = (input) => {
    return typeof input === "string" || input instanceof String;
};
const parseString = (input) => {
    if (!input || !isString(input)) {
        throw new Error("input wrong, not a string " + input);
    }
    return input;
};
const isDate = (input) => {
    return Boolean(Date.parse(input));
};
const parseDate = (input) => {
    if (!input || !isString(input) || !isDate(input)) {
        throw new Error("input wrong, not a date " + input);
    }
    return input;
};
const isGender = (input) => {
    return Object.values(types_1.Gender).includes(input);
};
const parseGender = (input) => {
    if (!input || !isGender(input)) {
        throw new Error("input wrong, not a gender " + name);
    }
    return input;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (input) => {
    return {
        name: parseString(input.name),
        dateOfBirth: parseDate(input.dateOfBirth),
        ssn: parseString(input.ssn),
        gender: parseGender(input.gender),
        occupation: parseString(input.occupation),
    };
};
exports.toNewPatientEntry = toNewPatientEntry;
