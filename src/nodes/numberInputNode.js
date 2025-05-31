import React, { useState } from "react";
import { Position } from "reactflow";
import BaseNode from "./BaseNode";

export const NumberInputNode = ({ id, data }) => {
  const [number, setNumber] = useState(data?.number || 0);

  const fields = [
    {
      label: "Number:",
      type: "number",
      value: number,
      onChange: (e) => setNumber(e.target.value),
    },
  ];

  const handles = [
    {
      type: "source",
      position: Position.Right,
      id: `${id}-number`,
    },
  ];

  return (
    <BaseNode id={id} title="Number Input" fields={fields} handles={handles} />
  );
};
