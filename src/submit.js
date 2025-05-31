// submit.js

export const SubmitButton = () => {
  return (
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
  );
};
