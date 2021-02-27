/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useEffect } from "react";
// types
import { Patient, Entry } from "../types";

// interact with backend
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";

// init patients
import { useStateValue, editPatientList } from "../state";

// style
import { Container, Header, Icon, List } from "semantic-ui-react";

const EntryDetail: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      {`${entry.date} ${entry.description}`}
      <List as="ul">
        {entry.diagnosisCodes?.map((code) => (
          <List.Item key={code} as="li">
            {code}
          </List.Item>
        ))}
      </List>
    </div>
  );
};

const PatientDetail: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient>();

  const { id } = useParams<{ id: string }>();
  const foundPatient = patients[id];
  //   console.log(patients[id]);
  //   console.log("found", foundPatient);
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

  patient.entries.map((patient) => console.log("single: ", patient.date));
  // console.log("patienr: ", patient.entries.map);
  return (
    <div>
      <Container>
        <Header as="h2">
          {patient.name}
          {GenderIcon()}
        </Header>

        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <Header as="h3">entries</Header>

        {patient.entries.map((entry) => (
          <EntryDetail key={entry.id} entry={entry} />
        ))}
      </Container>
    </div>
  );
};

export { PatientDetail };
