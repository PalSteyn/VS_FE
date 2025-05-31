import React from "react";
import { Position } from "reactflow";
import BaseNode from "./BaseNode";

export const StaticInfoNode = ({ id }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-input`,
    },
  ];

  return (
    <BaseNode id={id} title="Info" handles={handles}>
      <span>This is a static info node.</span>
    </BaseNode>
  );
};
