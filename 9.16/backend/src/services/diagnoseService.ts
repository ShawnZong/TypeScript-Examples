import diagnosesData from "../../data/diagnosis";

import { Diagnose } from "../types";

const getAllDiagnoses = (): Array<Diagnose> => {
  return diagnosesData;
};

export default { getAllDiagnoses };
