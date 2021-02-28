import React from "react";

// Form
import { Field } from "formik";
import { NumberField, TextField } from "./FormField";

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
    case "OccupationalHealthcare":
      return (
        <div>
          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Sick Leave Start Date"
            placeholder="YYYY-MM-DD"
            name="sickLeaveStartDate"
            component={TextField}
          />
          <Field
            label="Sick Leave End Date"
            placeholder="YYYY-MM-DD"
            name="sickLeaveEndDate"
            component={TextField}
          />
        </div>
      );
    case "Hospital":
      return (
        <div>
          <Field
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            name="dischargeDate"
            component={TextField}
          />
          <Field
            label="Discharge Criteria"
            placeholder="Discharge Criteria"
            name="dischargeCrieria"
            component={TextField}
          />
        </div>
      );
    default:
      return null;
  }
};
