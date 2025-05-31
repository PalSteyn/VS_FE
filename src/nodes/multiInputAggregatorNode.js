import React from "react";
import { Position } from "reactflow";
import BaseNode from "./BaseNode";

export const MultiInputAggregatorNode = ({ id }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-input1`,
      style: { top: "30%" },
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-input2`,
      style: { top: "70%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-output`,
    },
  ];

  return (
    <BaseNode id={id} title="Aggregator" handles={handles}>
      <span>Aggregates two inputs</span>
    </BaseNode>
  );
};
