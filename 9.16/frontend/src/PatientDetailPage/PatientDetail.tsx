import React, { useState, useEffect } from "react";
// types
import { Patient } from "../types";

// interact with backend
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";

// init patients
import { useStateValue, editPatientList } from "../state";

// style
import { Container, Header, Icon } from "semantic-ui-react";

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
  return (
    <div>
      <Container>
        <Header as="h2">
          {patient.name}
          {GenderIcon()}
        </Header>
      </Container>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export { PatientDetail };
