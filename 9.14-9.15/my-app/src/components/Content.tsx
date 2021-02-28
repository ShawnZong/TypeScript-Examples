import React from "react";
import { CoursePart } from "../types";
// components
import { Part } from "./Part";

const Content: React.FC<{
  courseParts: CoursePart[];
}> = ({ courseParts }) => {
  console.log(courseParts);
  courseParts.map((course) => console.log(course.name));

  return (
    <div>
      {courseParts.map((course) => (
        <Part key={course.name} {...course} />
        // <p key={course.name}>
        //   {course.name} {course.exerciseCount}
        // </p>
      ))}
    </div>
  );
};

export { Content };
