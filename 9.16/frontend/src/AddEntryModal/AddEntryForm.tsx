import React from "react";
// state
import { useStateValue } from "../state";

// components
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection, NumberField } from "./FormField";
// import * as yup from "yup";

// types
import { Diagnosis, HealthCheckRating } from "../types";

// style
import { Grid, Button } from "semantic-ui-react";

export type EntryFormValues = {
  type: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: Diagnosis[];
  healthCheckRating: HealthCheckRating;
};

// const entryFormSchema = {
//   type: yup.string().required(),
//   description: yup.string().required(),
//   date: yup.string().required(),
//   specialist: yup.string().required(),
//   healthCheckRating: yup.number().required(),
// };

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
    >
      {({ handleSubmit, isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui" onSubmit={handleSubmit}>
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            {/* <SelectField
              label="Gender"
              name="gender"
              options={genderOptions}
            /> */}
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
