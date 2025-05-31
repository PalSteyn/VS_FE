// toolbar.js

import { DraggableNode } from "./draggableNode";

const nodeButtons = [
  { type: "customInput", label: "Input", icon: "↪️" },
  { type: "llm", label: "LLM", icon: "💬" },
  { type: "customOutput", label: "Output", icon: "↩️" },
  { type: "text", label: "Text", icon: "🅣" },
  { type: "numberInput", label: "Number Input", icon: "🔢" },
  { type: "booleanSwitch", label: "Boolean Switch", icon: "🔘" },
  { type: "dropdownSelector", label: "Dropdown Selector", icon: "⬇️" },
  { type: "multiAggregator", label: "Aggregator", icon: "➕" },
  { type: "staticInfo", label: "Info", icon: "ℹ️" },
];

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        padding: "14px 0 8px 0",
        borderBottom: "1.5px solid #e0e7ff",
        boxShadow: "0 2px 8px #b3baff11",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10,
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          marginLeft: 12,
        }}
      >
        {nodeButtons.map((btn) => (
          <div
            key={btn.type}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "1.5px solid #b3baff",
              borderRadius: 10,
              background: "#fff",
              boxShadow: "0 2px 8px #b3baff11",
              padding: "6px 8px 4px 8px",
              minWidth: 44,
              minHeight: 38,
              cursor: "grab",
              transition: "border 0.2s, box-shadow 0.2s",
            }}
          >
            <span style={{ fontSize: 18, marginBottom: 1 }}>{btn.icon}</span>
            <DraggableNode type={btn.type} label={btn.label} />
          </div>
        ))}
      </div>
    </div>
  );
};
