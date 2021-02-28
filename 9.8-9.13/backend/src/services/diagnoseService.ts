import diagnosesData from "../../data/diagnoses";

import { Diagnose } from "../types";

const getAllDiagnoses = (): Array<Diagnose> => {
  return diagnosesData;
};

export default { getAllDiagnoses };
