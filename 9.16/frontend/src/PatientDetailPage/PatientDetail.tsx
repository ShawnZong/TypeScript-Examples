/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useEffect } from "react";
// types
import { Patient } from "../types";

// interact with backend
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";

// components
import { EntryDetail } from "./EntryDetail";

// init patients
import { useStateValue, editPatientList } from "../state";

// style
import { Container, Header, Icon } from "semantic-ui-react";

const PatientDetail: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient>();

  const { id } = useParams<{ id: string }>();
  const foundPatient = patients[id];

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
