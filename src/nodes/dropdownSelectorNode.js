import React, { useState } from "react";
import { Position } from "reactflow";
import BaseNode from "./BaseNode";

export const DropdownSelectorNode = ({ id, data }) => {
  const [selected, setSelected] = useState(data?.selected || "option1");
  const [options, setOptions] = useState(
    data?.options || [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ]
  );
  const [editMode, setEditMode] = useState(false);

  // Handle renaming an option
  const handleOptionLabelChange = (idx, newLabel) => {
    setOptions((opts) =>
      opts.map((opt, i) => (i === idx ? { ...opt, label: newLabel } : opt))
    );
  };

  // Add a new option
  const handleAddOption = () => {
    const newIdx = options.length + 1;
    setOptions((opts) => [
      ...opts,
      { value: `option${newIdx}`, label: `Option ${newIdx}` },
    ]);
  };

  // Remove an option
  const handleRemoveOption = (idx) => {
    setOptions((opts) => opts.filter((_, i) => i !== idx));
    // If the selected option is removed, select the first option
    if (options[idx]?.value === selected && options.length > 1) {
      setSelected(options[0].value);
    }
  };

  const fields = [
    {
      label: (
        <span>
          <button
            onClick={() => setEditMode((v) => !v)}
            style={{
              marginLeft: 4,
              marginRight: 4,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              color: "#2196f3",
              padding: 0,
              lineHeight: 1,
            }}
            title={editMode ? "Hide option editor" : "Edit options"}
          >
            ✎
          </button>
          <span style={{ marginRight: 4 }}>Select:</span>
        </span>
      ),
      type: "select",
      value: selected,
      onChange: (e) => setSelected(e.target.value),
      options: options,
    },
  ];

  return (
    <BaseNode
      id={id}
      title="Dropdown Selector"
      fields={fields}
      handles={[
        {
          type: "source",
          position: Position.Right,
          id: `${id}-selected`,
        },
      ]}
    >
      {editMode && (
        <div style={{ marginTop: 6 }}>
          <span>Edit Options:</span>
          {options.map((opt, idx) => (
            <div
              key={opt.value}
              style={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <input
                type="text"
                value={opt.label}
                onChange={(e) => handleOptionLabelChange(idx, e.target.value)}
                style={{ width: 70, marginRight: 4 }}
              />
              <button
                onClick={() => handleRemoveOption(idx)}
                disabled={options.length <= 1}
                style={{
                  color: "#fff",
                  background: "#f44336",
                  border: "none",
                  borderRadius: 3,
                  width: 18,
                  height: 18,
                  cursor: options.length > 1 ? "pointer" : "not-allowed",
                  fontWeight: "bold",
                  padding: 0,
                }}
                title="Remove option"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={handleAddOption}
            style={{
              color: "#fff",
              background: "#2196f3",
              border: "none",
              borderRadius: 3,
              width: 18,
              height: 18,
              cursor: "pointer",
              fontWeight: "bold",
              padding: 0,
            }}
            title="Add option"
          >
            +
          </button>
        </div>
      )}
    </BaseNode>
  );
};
