import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "EDIT_PATIENT_LIST";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      id: string;
      payload: Entry;
    };

// action creators
export const editPatientList = (patient: Patient): Action => {
  return {
    type: "EDIT_PATIENT_LIST",
    payload: patient,
  };
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const setDiagnosisList = (codes: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: codes,
  };
};

export const addEntry = (id: string, newEntry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    id: id,
    payload: newEntry,
  };
};

// reducer
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "EDIT_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };

    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnosis,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_ENTRY":
      const id = action.id;
      const tmpPatients = { ...state.patients };
      tmpPatients[id].entries.push(action.payload);
      return {
        ...state,
        patients: {
          ...tmpPatients,
        },
      };
    default:
      return state;
  }
};
