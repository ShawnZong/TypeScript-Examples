// react
import React from "react";

// types
import {
  assertNever,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types";

// style
import { Header, Icon, List, Segment } from "semantic-ui-react";
import { useStateValue } from "../state";

const DiagnosisDetail: React.FC<{ codes: string[] | undefined }> = ({
  codes,
}) => {
  const [{ diagnosis }] = useStateValue();
  if (!codes) {
    return null;
  }
  return (
    <div>
      {codes.map((code) => (
        <List.Item key={code} as="li">
          {`${code} ${diagnosis[code].name}`}
        </List.Item>
      ))}
    </div>
  );
};

const HealthCheckEntryDetail: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  return (
    <Segment>
      <Header as="h2">
        {entry.date}
        <Icon name="heartbeat" />
      </Header>
      <p>{entry.description}</p>
      <p>specialist: {entry.specialist}</p>
      <p>Rating: {entry.healthCheckRating} </p>
      <DiagnosisDetail codes={entry.diagnosisCodes} />
    </Segment>
  );
};
const HospitalEntryDetail: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Segment>
      <Header as="h2">
        {entry.date}
        <Icon name="hospital" />
      </Header>
      <p>{entry.description}</p>
      <p>Specialist: {entry.specialist}</p>
      <p>
        Discharge: {`${entry.discharge?.date} ${entry.discharge?.criteria}`}{" "}
      </p>
      <DiagnosisDetail codes={entry.diagnosisCodes} />
    </Segment>
  );
};
const OccupationalHealthcareEntryDetail: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <Segment>
      <Header as="h2">
        {entry.date}
        <Icon name="medkit" />
      </Header>
      <p>{entry.description}</p>
      <p>Specialist: {entry.specialist}</p>
      <p>Employer: {entry.employerName}</p>
      <p>
        Period: {`${entry.sickLeave?.startDate} - ${entry.sickLeave?.endDate}`}
      </p>
      <DiagnosisDetail codes={entry.diagnosisCodes} />
    </Segment>
  );
};

export const EntryDetail: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetail entry={entry} />;
    case "Hospital":
      return <HospitalEntryDetail entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetail entry={entry} />;
    default:
      return assertNever(entry);
  }
};
