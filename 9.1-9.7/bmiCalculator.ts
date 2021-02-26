const calculateBmi = (
  height: number,
  weight: number
): Record<string, unknown> => {
  if (isNaN(height) || isNaN(weight)) {
    throw new Error("provided data is not numbers");
  }
  if (height === 0) {
    throw new Error("height cannot be 0");
  }

  const bmi = weight / (height * height);
  if (bmi >= 30) {
    return {
      weight,
      height,
      bmi: "Obese",
    };
  } else if (bmi >= 25) {
    return {
      weight,
      height,
      bmi: "Overweight",
    };
    // return "Overweight";
  } else {
    return {
      weight,
      height,
      bmi: "Normal (healthy weight)",
    };
    // return "Normal";
  }
};

try {
  console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log("error: ", e.message);
}

export { calculateBmi };
