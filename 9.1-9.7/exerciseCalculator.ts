const calculateExercises = (
  target: number,
  days: Array<number>
): Record<string, unknown> => {
  if (!target || days.length === 0) {
    return { error: "parameters missing" };
    // throw new Error("please enter data");
  }
  let trainingDays = 0;
  if (!days.every((day) => !isNaN(Number(day)))) {
    return { error: "malformatted parameters" };
  }
  days.forEach((day) => {
    if (day > 0) trainingDays++;
  });
  const sum = days.reduce((a, b) => a + b, 0);
  const average = sum / days.length || 0;

  //   const target = Number(process.argv[4]);
  const success = average > target;

  let rating = 1;
  let ratingDescription = "not too bad but could be better";
  if (average > 3) {
    rating = 3;
    ratingDescription = "doing great!";
  } else if (average > 2) {
    rating = 2;
    ratingDescription = "good";
  }

  return {
    periodLength: days.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    average,
  };
};

const days = process.argv.slice(3).map((day) => Number(day));

try {
  console.log(calculateExercises(Number(process.argv[2]), days));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log("error: ", e.message);
}
export { calculateExercises };
