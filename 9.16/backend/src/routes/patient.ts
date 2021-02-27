import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/:id", (_request, response) => {
  //   console.log(diagnoseService.getAllDiagnoses());
  // console.log(_request.params.id);
  const patient = patientService.findPatient(_request.params.id);
  if (!patient) {
    response.status(404).send("ID not found");
  }
  if (!patient?.entries) {
    response.send({ ...patient, entries: [] });
  }
  response.send(patient);
});

router.get("/", (_request, response) => {
  //   console.log(diagnoseService.getAllDiagnoses());
  response.send(patientService.getAllPatients());
});

router.post("/", (_request, response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newPatientEntry = toNewPatientEntry(_request.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    response.json(addedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    response.status(400).send(e.message);
  }
});

export default router;
