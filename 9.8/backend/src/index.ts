// express configuration
import express from "express";
import cors from "cors";
import diagnoseRouter from "./routes/diagnose";

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

// router
app.get("/api/ping", (_request, response) => {
  response.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);

// run server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
