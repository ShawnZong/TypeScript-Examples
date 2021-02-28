// new types
export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CourseDescExtend extends CoursePartBase {
  description: string;
}

export interface CoursePartOne extends CourseDescExtend {
  name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends CourseDescExtend {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends CourseDescExtend {
  name: "Fourth course";
  mood: string;
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;
