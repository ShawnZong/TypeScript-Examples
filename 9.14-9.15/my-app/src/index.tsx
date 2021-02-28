// react configuration
import React from "react";
import ReactDOM from "react-dom";

// components
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { Total } from "./components/Total";

// data source
import { courseParts } from "./data";

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
