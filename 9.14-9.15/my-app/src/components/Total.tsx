import React from "react";
import { CoursePart } from "../types";

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => (
  <h1>
    {` Number of exercises: ${courseParts.reduce(
      (carry, part) => carry + part.exerciseCount,
      0
    )}`}
  </h1>
);

export { Total };
