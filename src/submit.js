// submit.js

import { useStore } from "./store";
import { useState } from "react";

function ResultModal({ open, onClose, result }) {
  if (!open) return null;
  const isDAG = result && result.is_dag;
  const dagMessages =
    result && result.dag_messages && result.dag_messages.length > 0
      ? result.dag_messages
      : [];
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 32,
          minWidth: 350,
          boxShadow: "0 4px 24px #0002",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          ×
        </button>
        <h2 style={{ marginTop: 0, marginBottom: 24, fontWeight: 700 }}>
          Pipeline Validation Results
        </h2>
        <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
          <div
            style={{
              flex: 1,
              background: "#f6f8ff",
              borderRadius: 12,
              padding: 16,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 14, color: "#888" }}>Nodes</div>
            <div style={{ fontSize: 28, fontWeight: 600 }}>
              {result.num_nodes}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              background: "#f6f8ff",
              borderRadius: 12,
              padding: 16,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 14, color: "#888" }}>Edges</div>
            <div style={{ fontSize: 28, fontWeight: 600 }}>
              {result.num_edges}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
          <div
            style={{
              flex: 1,
              background: isDAG ? "#e8fbe8" : "#ffebee",
              borderRadius: 12,
              padding: 12,
              textAlign: "center",
              color: isDAG ? "#2e7d32" : "#c62828",
              fontWeight: 600,
              border: isDAG ? "1px solid #b2dfdb" : "1px solid #ffcdd2",
            }}
          >
            <span>{isDAG ? "✔" : "✖"} DAG Structure</span>{" "}
            <span
              style={{
                marginLeft: 8,
                background: isDAG ? "#c8e6c9" : "#ffcdd2",
                borderRadius: 8,
                padding: "2px 8px",
                fontSize: 12,
              }}
            >
              {isDAG ? "Valid" : "Invalid"}
            </span>
          </div>
        </div>
        {dagMessages.length > 0 && (
          <div
            style={{
              background: "#fffbe7",
              borderRadius: 8,
              padding: 16,
              color: "#bfa100",
              fontWeight: 500,
              fontSize: 15,
              marginTop: 8,
            }}
          >
            <div style={{ marginBottom: 4, fontWeight: 600 }}>
              DAG Validation Messages
            </div>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {dagMessages.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });
      const data = await response.json();
      setResult(data);
      setModalOpen(true);
    } catch (error) {
      setResult({ error: "Failed to submit pipeline: " + error });
      setModalOpen(true);
    }
  };

  return (
    <>
      <ResultModal
        open={modalOpen && result}
        onClose={() => setModalOpen(false)}
        result={result || { num_nodes: 0, num_edges: 0, is_dag: false }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 32,
        }}
      >
        <button
          type="submit"
          style={{
            padding: "12px 32px",
            borderRadius: 18,
            border: "2px solid #b3baff",
            background: "#f6f8ff",
            color: "#222",
            fontWeight: 600,
            fontSize: 20,
            boxShadow: "0 2px 8px #b3baff33",
            cursor: "pointer",
            transition: "background 0.2s, border 0.2s",
          }}
          onClick={handleSubmit}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#e0e7ff";
            e.currentTarget.style.borderColor = "#7c83f7";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#f6f8ff";
            e.currentTarget.style.borderColor = "#b3baff";
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
};
