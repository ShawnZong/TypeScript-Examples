import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_request, response) => {
  //   console.log(diagnoseService.getAllDiagnoses());
  response.send(patientService.getAllPatients());
});

export default router;
