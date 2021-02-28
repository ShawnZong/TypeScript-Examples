import { CoursePart } from "./types";

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fourth course",
    exerciseCount: 10,
    description: "This is an awesome course part",
    mood: "tired",
  },
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
  },
];

export { courseParts };
