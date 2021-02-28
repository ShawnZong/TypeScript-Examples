/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useEffect } from "react";
// types
import { Entry, Patient, SickLeave, Discharged } from "../types";

// interact with backend
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";

// components
import { EntryDetail } from "./EntryDetail";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddPatientModal from "../AddEntryModal/index";

// state
import { useStateValue, editPatientList } from "../state";
import { addEntry } from "../state/reducer";

// style
import { Container, Header, Icon, Button } from "semantic-ui-react";

const PatientDetail: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient>();

  const { id } = useParams<{ id: string }>();
  const foundPatient = patients[id];

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  interface SubmitEntryFormValues extends EntryFormValues {
    sickLeave?: SickLeave;
    discharge?: Discharged;
  }
  const submitNewEntry = async (values: SubmitEntryFormValues) => {
    try {
      switch (values.type) {
        case "OccupationalHealthcare":
          if (!values.sickLeaveStartDate) {
            values.sickLeaveStartDate = "";
          }
          if (!values.sickLeaveEndDate) {
            values.sickLeaveEndDate = "";
          }
          values.sickLeave = {
            startDate: values.sickLeaveStartDate,
            endDate: values.sickLeaveEndDate,
          };
          break;
        case "Hospital":
          if (!values.dischargeDate) {
            values.dischargeDate = "";
          }
          if (!values.dischargeCrieria) {
            values.dischargeCrieria = "";
          }
          values.discharge = {
            date: values.dischargeDate,
            criteria: values.dischargeCrieria,
          };
          break;

        default:
          throw new Error("invalid form data");
      }
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      console.log(newEntry);
      dispatch(addEntry(id, newEntry));
      // dispatch({ type: "ADD_PATIENT", payload: newPatient });
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setPatient(foundPatient);
    if (!foundPatient) {
      const fetchPatient = async () => {
        try {
          const response = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(editPatientList(response.data));
        } catch (e) {
          console.error(e);
        }
      };
      fetchPatient();
    }
  }, [foundPatient, dispatch, id]);
  //   console.log(patient);
  if (!patient) {
    return <div>no this patient</div>;
  }

  const GenderIcon = () => {
    if (patient.gender === "male") {
      return <Icon name="mars" />;
    } else if (patient.gender === "female") {
      return <Icon name="venus" />;
    } else {
      return <Icon name="genderless" />;
    }
  };

  return (
    <div>
      <Container>
        <Header as="h2">
          {patient.name}
          {GenderIcon()}
        </Header>

        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <Header as="h3">Entries</Header>
        <Button onClick={() => openModal()}>Add New Entry</Button>
        <AddPatientModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        {patient.entries.length === 0 ? (
          <p>no entries</p>
        ) : (
          patient.entries.map((entry) => (
            <EntryDetail key={entry.id} entry={entry} />
          ))
        )}
      </Container>
    </div>
  );
};

export { PatientDetail };
