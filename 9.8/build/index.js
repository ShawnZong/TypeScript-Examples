"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// express configuration
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.use(express_1.default.json());
const PORT = 3000;
// router
app.get("/ping", (_request, response) => {
    response.send("pong");
});
// run server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
