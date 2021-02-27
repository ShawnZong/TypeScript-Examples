// react
import React from "react";

// types
import { Entry } from "../types";

// style
import { List } from "semantic-ui-react";
import { useStateValue } from "../state";

const DiagnosisDetail: React.FC<{ code: string }> = ({ code }) => {
  const [{ diagnosis }] = useStateValue();
  return <div>{`${code} ${diagnosis[code].name}`}</div>;
};

export const EntryDetail: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      {`${entry.date} ${entry.description}`}
      <List as="ul">
        {entry.diagnosisCodes?.map((code) => (
          <List.Item key={code} as="li">
            <DiagnosisDetail code={code} />
          </List.Item>
        ))}
      </List>
    </div>
  );
};
