import React, { useState } from "react";
import { Position } from "reactflow";
import BaseNode from "./BaseNode";

export const BooleanSwitchNode = ({ id, data }) => {
  const [checked, setChecked] = useState(data?.checked || false);

  const fields = [
    {
      label: "Switch:",
      type: "checkbox",
      value: checked,
      onChange: (e) => setChecked(e.target.checked),
    },
  ];

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-input`,
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-output`,
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Boolean Switch"
      fields={fields}
      handles={handles}
    />
  );
};
