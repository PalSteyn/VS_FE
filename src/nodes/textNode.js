// textNode.js

import React, { useState, useEffect, useRef } from "react";
import { Position, useUpdateNodeInternals } from "reactflow";
import BaseNode from "./BaseNode";

// Helper to extract unique variable names in {{var}} format
function extractVariables(text) {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const vars = [];
  let match;
  while ((match = regex.exec(text))) {
    if (!vars.includes(match[1])) vars.push(match[1]);
  }
  return vars;
}

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const [textareaHeight, setTextareaHeight] = useState(40);
  const textareaRef = useRef(null);
  const shadowRef = useRef(null);

  const updateNodeInternals = useUpdateNodeInternals();

  const width = 380;
  const minHeight = 120;
  const maxHeight = 220;

  // Update variables when text changes
  useEffect(() => {
    setVariables(extractVariables(currText));
  }, [currText]);

  // Auto-grow textarea height using a hidden shadow textarea
  useEffect(() => {
    if (shadowRef.current) {
      shadowRef.current.value = currText || " ";
      let newHeight = shadowRef.current.scrollHeight;
      newHeight = Math.max(40, Math.min(maxHeight - 32, newHeight));
      setTextareaHeight(newHeight);
    }
  }, [currText]);

  // Handles for variables (left side, spaced vertically)
  const variableHandles = variables.map((v, i) => ({
    type: "target",
    position: Position.Left,
    id: `${id}-var-${v}`,
    style: { top: `${(i + 1) * (minHeight / (variables.length + 1))}px` },
    variable: v,
  }));

  // Output handle (right side)
  const handles = [
    ...variableHandles,
    {
      type: "source",
      position: Position.Right,
      id: `${id}-output`,
      style: { top: `${minHeight / 2}px` },
    },
  ];

  // Update node internals whenever variables or text changes
  useEffect(() => {
    if (id) {
      updateNodeInternals(id);
    }
  }, [id, variables, currText, updateNodeInternals]);

  return (
    <BaseNode
      id={id}
      title="Text"
      fields={[]}
      handles={handles}
      containerStyle={{
        width,
        minWidth: width,
        maxWidth: width,
        height: Math.max(minHeight, textareaHeight + 80),
      }}
    >
      <div style={{ position: "", width: "100%" }}>
        <label style={{ width: "100%", display: "" }}>
          <span style={{ fontWeight: 500, fontSize: 15 }}>Text:</span>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            style={{
              width: "100%",
              minWidth: 0,
              height: textareaHeight,
              minHeight: 40,
              maxHeight: maxHeight - 32,
              resize: "none",
              fontFamily: "inherit",
              fontSize: 16,
              overflowY: textareaHeight >= maxHeight - 32 ? "auto" : "hidden",
              boxSizing: "border-box",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              border: "1.5px solid #b3baff",
              borderRadius: 8,
              padding: 10,
              background: "#fff",
              marginTop: 3,
              transition: "height",
            }}
            spellCheck={true}
            placeholder="Enter text with variables like {{context}}"
          />
          {/* Hidden shadow textarea for measuring height */}
          <textarea
            ref={shadowRef}
            style={{
              position: "absolute",
              top: -9999,
              left: -9999,
              height: "auto",
              visibility: "hidden",
              zIndex: -1,
              width: "100%",
              fontFamily: "inherit",
              fontSize: 16,
              padding: 10,
              border: 0,
              resize: "none",
              overflow: "hidden",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
            tabIndex={-1}
            aria-hidden="true"
            readOnly
          />
        </label>
        {/* Variable labels next to handles */}
        {variableHandles.map((handle, idx) => (
          <div
            key={handle.id}
            style={{
              position: "absolute",
              left: -110,
              top: handle.style.top,
              fontSize: 13,
              color: "#888",
              width: 90,
              textAlign: "right",
              pointerEvents: "none",
            }}
          >
            {handle.variable}
          </div>
        ))}
      </div>
    </BaseNode>
  );
};
