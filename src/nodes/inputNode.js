// inputNode.js

import React, { useState } from "react";
import { Position } from "reactflow";
import BaseNode from "./BaseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const fields = [
    {
      label: "Name:",
      type: "text",
      value: currName,
      onChange: (e) => setCurrName(e.target.value),
    },
    {
      label: "Type:",
      type: "select",
      value: inputType,
      onChange: (e) => setInputType(e.target.value),
      options: [
        { value: "Text", label: "Text" },
        { value: "File", label: "File" },
      ],
    },
  ];

  const handles = [
    {
      type: "source",
      position: Position.Right,
      id: `${id}-value`,
    },
  ];

  return <BaseNode title="Input" fields={fields} handles={handles} />;
};
