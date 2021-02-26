import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/bmi", (request, response) => {
  const height = Number(request.query.height);
  const weight = Number(request.query.weight);
  response.send(calculateBmi(height, weight));
});

app.post("/exercises", (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = request.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  response.send(calculateExercises(body.target, body.daily_exercises));
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
