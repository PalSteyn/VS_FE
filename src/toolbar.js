// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="numberInput" label="Number Input" />
        <DraggableNode type="booleanSwitch" label="Boolean Switch" />
        <DraggableNode type="dropdownSelector" label="Dropdown Selector" />
        <DraggableNode type="multiAggregator" label="Aggregator" />
        <DraggableNode type="staticInfo" label="Info" />
      </div>
    </div>
  );
};
