import React from "react";
// state
import { useStateValue } from "../state";

// components
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection, NumberField } from "./FormField";
// import * as yup from "yup";

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
  diagnosisCodes: Diagnose[];
  healthCheckRating: HealthCheckRating;
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

  return errors;
};

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

// const genderOptions: GenderOption[] = [
//   { value: Gender.Male, label: "Male" },
//   { value: Gender.Female, label: "Female" },
//   { value: Gender.Other, label: "Other" }
// ];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      // validationSchema={entryFormSchema}
      initialValues={{
        type: "",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        return validate(values);
      }}
    >
      {({ handleSubmit, isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui" onSubmit={handleSubmit}>
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Field
              label="Type"
              placeholder="type"
              name="type"
              component={TextField}
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
            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />

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
