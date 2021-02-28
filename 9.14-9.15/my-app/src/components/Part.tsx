import React from "react";
import { CoursePart } from "../types";
import { assertNever } from "../uils";

const Part: React.FC<CoursePart> = (props) => {
  switch (props.name) {
    case "Fundamentals":
      return (
        <div>
          <h1> {`name: ${props.name} `}</h1>
          <p>{`exerciseCount: ${props.exerciseCount}`}</p>
          <p>{`description: ${props.description}`}</p>
        </div>
      );
      break;
    case "Using props to pass data":
      return (
        <div>
          <h1> {`name: ${props.name} `}</h1>
          <p>{`exerciseCount: ${props.exerciseCount}`}</p>
          <p>{`groupProjectCount: ${props.groupProjectCount}`}</p>
        </div>
      );
      break;
    case "Deeper type usage":
      return (
        <div>
          <h1> {`name: ${props.name} `}</h1>
          <p>{`exerciseCount: ${props.exerciseCount}`}</p>
          <p>{`description: ${props.description}`}</p>
          <p>{`exerciseSubmissionLink: ${props.exerciseSubmissionLink}`}</p>
        </div>
      );
      break;
    case "Fourth course":
      return (
        <div>
          <h1> {`name: ${props.name} `}</h1>
          <p>{`exerciseCount: ${props.exerciseCount}`}</p>
          <p>{`description: ${props.description}`}</p>
          <p>{`mood: ${props.mood}`}</p>
        </div>
      );
      break;
    default:
      return assertNever(props);
  }
};

export { Part };
