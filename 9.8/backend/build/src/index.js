"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// express configuration
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnose_1 = __importDefault(require("./routes/diagnose"));
const app = express_1.default();
app.use(express_1.default.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors_1.default());
const PORT = 3001;
// router
app.get("/api/ping", (_request, response) => {
    response.send("pong");
});
app.use("/api/diagnoses", diagnose_1.default);
// run server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
