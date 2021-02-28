import express from "express";
import diagnoseService from "../services/diagnoseService";

const router = express.Router();

router.get("/", (_request, response) => {
  //   console.log(diagnoseService.getAllDiagnoses());
  response.send(diagnoseService.getAllDiagnoses());
});

export default router;
