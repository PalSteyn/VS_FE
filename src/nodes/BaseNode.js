import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../store";

/**
 * BaseNode abstraction for all node types.
 * @param {string} title - The node title/label.
 * @param {Array} fields - Array of field configs: { label, type, value, onChange, options }.
 * @param {Array} handles - Array of handle configs: { type, position, id, style }.
 * @param {object} containerStyle - Optional style overrides for the node container.
 * @param {React.ReactNode} children - Optional custom content.
 * @param {string} id - The node id (required for removal).
 */
const BaseNode = ({
  id,
  title,
  fields = [],
  handles = [],
  containerStyle = {},
  children,
}) => {
  const onNodesChange = useStore((state) => state.onNodesChange);

  const handleRemove = (e) => {
    e.stopPropagation();
    onNodesChange([{ id, type: "remove" }]);
  };

  return (
    <div
      style={{
        width: 200,
        height: 80,
        border: "1px solid black",
        position: "relative",
        ...containerStyle,
      }}
    >
      {/* Cancel/Remove Button */}
      <button
        onClick={handleRemove}
        style={{
          position: "absolute",
          top: 2,
          right: 2,
          background: "#f44336",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: 20,
          height: 20,
          cursor: "pointer",
          fontWeight: "bold",
          lineHeight: "18px",
          padding: 0,
        }}
        title="Remove node"
      >
        ×
      </button>
      {/* Handles */}
      {handles.map((handle, idx) => (
        <Handle key={idx} {...handle} />
      ))}
      <div>
        <span>{title}</span>
      </div>
      <div>
        {fields.map((field, idx) => (
          <label key={idx} style={{ marginRight: 8 }}>
            {field.label}
            {field.type === "select" ? (
              <select value={field.value} onChange={field.onChange}>
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                checked={field.type === "checkbox" ? field.value : undefined}
                value={field.type !== "checkbox" ? field.value : undefined}
                onChange={field.onChange}
              />
            )}
          </label>
        ))}
        {children}
      </div>
    </div>
  );
};

export default BaseNode;
