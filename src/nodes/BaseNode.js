import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../store";

/**
 * BaseNode abstraction for all node types.
 * @param {string} id - The node id (required for removal).
 * @param {string} title - The node title/label.
 * @param {Array} fields - Array of field configs: { label, type, value, onChange, options }.
 * @param {Array} handles - Array of handle configs: { type, position, id, style }.
 * @param {object} containerStyle - Optional style overrides for the node container.
 * @param {React.ReactNode} children - Optional custom content.
 * @param {React.ReactNode} icon - Optional icon for the header.
 */
const BaseNode = ({
  id,
  title,
  fields = [],
  handles = [],
  containerStyle = {},
  children,
  icon,
}) => {
  const onNodesChange = useStore((state) => state.onNodesChange);

  const handleRemove = (e) => {
    e.stopPropagation();
    onNodesChange([{ id, type: "remove" }]);
  };

  return (
    <div
      style={{
        minWidth: 320,
        maxWidth: 400,
        minHeight: 200,
        border: "2px solid #b3baff",
        borderRadius: 18,
        background: "#fff",
        boxShadow: "0 2px 8px #b3baff33",
        position: "relative",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        ...containerStyle,
      }}
    >
      {/* Handles */}
      {handles.map((handle, idx) => (
        <Handle key={idx} {...handle} />
      ))}
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #e0e7ff",
          padding: "10px 16px 6px 16px",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          background: "#f6f8ff",
          fontWeight: 600,
          fontSize: 18,
          gap: 10,
        }}
      >
        <span style={{ fontSize: 24, marginRight: 8 }}>{icon}</span>
        <span style={{ flex: 1 }}>{title || "Node"}</span>
        <button
          onClick={handleRemove}
          style={{
            background: "none",
            border: "none",
            color: "#888",
            fontSize: 22,
            cursor: "pointer",
            borderRadius: "50%",
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
          title="Remove node"
        >
          ×
        </button>
      </div>
      {/* Fields and children */}
      <div
        style={{
          flex: 1,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {fields.map((field, idx) => (
          <label key={idx} style={{ marginBottom: 6, fontWeight: 500 }}>
            {field.label}
            {field.type === "select" ? (
              <select
                value={field.value}
                onChange={field.onChange}
                style={{
                  marginLeft: 8,
                  padding: 4,
                  borderRadius: 6,
                  border: "1px solid #b3baff",
                  fontSize: 16,
                }}
              >
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : field.type === "checkbox" ? (
              <input
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
                style={{ marginLeft: 8 }}
              />
            ) : (
              <input
                type={field.type}
                value={field.value}
                onChange={field.onChange}
                style={{
                  marginLeft: 8,
                  padding: 6,
                  borderRadius: 6,
                  border: "1px solid #b3baff",
                  fontSize: 16,
                  width: "100%",
                  boxSizing: "border-box",
                }}
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
