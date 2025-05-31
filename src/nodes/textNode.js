// textNode.js

import React, { useState } from "react";
import { Position } from "reactflow";
import BaseNode from "./BaseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const fields = [
    {
      label: "Text:",
      type: "text",
      value: currText,
      onChange: (e) => setCurrText(e.target.value),
    },
  ];

  const handles = [
    {
      type: "source",
      position: Position.Right,
      id: `${id}-output`,
    },
  ];

  return <BaseNode title="Text" fields={fields} handles={handles} />;
};
