import React from "react";
// state
import { useStateValue } from "../state";

// components
import { Field, Formik, Form } from "formik";
import {
  TextField,
  DiagnosisSelection,
  TyperOption,
  SelectField,
} from "./FormField";
import { TypeAdditionalField } from "./TypeAdditionalField";

// types
import { Diagnose, HealthCheckRating } from "../types";
import { isDate } from "../utils";

// style
import { Grid, Button } from "semantic-ui-react";

export type EntryFormValues = {
  type: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Diagnose[];
  healthCheckRating?: HealthCheckRating;
  employerName?: string;
  sickLeaveStartDate?: string;
  sickLeaveEndDate?: string;
  dischargeDate?: string;
  dischargeCrieria?: string;
};

const validate = (values: EntryFormValues) => {
  const requiredError = "Field is required";
  const invalidFormatError = "Field is not in correct format";
  const errors: { [field: string]: string } = {};

  if (!values.type) {
    errors.type = requiredError;
  }
  if (!values.description) {
    errors.description = requiredError;
  }
  if (!values.date) {
    errors.date = requiredError;
  }
  if (!isDate(values.date)) {
    errors.date = invalidFormatError;
  }
  if (!values.specialist) {
    errors.specialist = requiredError;
  }
  if (values.sickLeaveStartDate && !isDate(values.sickLeaveStartDate)) {
    errors.sickLeaveStartDate = invalidFormatError;
  }
  if (values.sickLeaveEndDate && !isDate(values.sickLeaveEndDate)) {
    errors.sickLeaveEndDate = invalidFormatError;
  }
  if (values.dischargeDate && !isDate(values.dischargeDate)) {
    errors.dischargeDate = invalidFormatError;
  }
  // type: "OccupationalHealthcare",
  // description: "df",
  // date: "1999-01-01",
  // specialist: "a",
  // diagnosisCodes: [],
  // healthCheckRating: 0,
  // employerName: "s",
  // sickLeaveStartDate: "1999-01-01",
  // sickLeaveEndDate: "1999-01-01",
  // dischargeDate: "1999-01-01",
  // dischargeCrieria: "s",
  return errors;
};

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TyperOption[] = [
  { value: "HealthCheck", label: "HealthCheck" },
  { value: "OccupationalHealthcare", label: "OccupationalHealthcare" },
  { value: "Hospital", label: "Hospital" },
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();
  const [type, setType] = React.useState("OccupationalHealthcare");

  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        description: "df",
        date: "1999-01-01",
        specialist: "a",
        diagnosisCodes: [],
        healthCheckRating: 0,
        employerName: "s",
        sickLeaveStartDate: "1999-01-01",
        sickLeaveEndDate: "1999-01-01",
        dischargeDate: "1999-01-01",
        dischargeCrieria: "s",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        return validate(values);
      }}
    >
      {({ handleSubmit, isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui" onSubmit={handleSubmit}>
            <SelectField
              label="Entry Type"
              name="type"
              options={typeOptions}
              setValue={setType}
            />
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <TypeAdditionalField type={type} />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
