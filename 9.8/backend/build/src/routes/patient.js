"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get("/", (_request, response) => {
    //   console.log(diagnoseService.getAllDiagnoses());
    response.send(patientService_1.default.getAllPatients());
});
router.post("/", (_request, response) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const newPatientEntry = utils_1.toNewPatientEntry(_request.body);
        const addedPatient = patientService_1.default.addPatient(newPatientEntry);
        response.json(addedPatient);
    }
    catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        response.status(400).send(e.message);
    }
});
exports.default = router;
