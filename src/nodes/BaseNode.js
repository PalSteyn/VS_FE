import React from "react";
import { Handle } from "reactflow";

/**
 * BaseNode abstraction for all node types.
 * @param {string} title - The node title/label.
 * @param {Array} fields - Array of field configs: { label, type, value, onChange, options }.
 * @param {Array} handles - Array of handle configs: { type, position, id, style }.
 * @param {object} containerStyle - Optional style overrides for the node container.
 * @param {React.ReactNode} children - Optional custom content.
 */
const BaseNode = ({
  title,
  fields = [],
  handles = [],
  containerStyle = {},
  children,
}) => {
  return (
    <div
      style={{
        width: 200,
        height: 80,
        border: "1px solid black",
        ...containerStyle,
      }}
    >
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
                value={field.value}
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
