import React from "react";

// Form
import { Field } from "formik";
import { NumberField } from "./FormField";

export const TypeAdditionalField: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case "HealthCheck":
      return (
        <Field
          label="healthCheckRating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
      );
    default:
      return null;
  }
};
