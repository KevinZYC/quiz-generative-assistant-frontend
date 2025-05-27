import React from "react";

const FileParser = ({ uploadPDF, loading, summary }) => (
  <section style={sectionStyle}>
    <h2>1. Upload PDF</h2>
    <input type="file" accept="application/pdf" onChange={uploadPDF} />
    {loading && <p>Loading summary...</p>}
    {summary && (
      <div style={scrollStyle}>
        <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(summary, null, 2)}
      </pre>
      </div>
    )}
  </section>
);

const sectionStyle = {
  border: "1px solid #ddd",
  padding: "1rem",
  marginBottom: "2rem",
  borderRadius: "8px",
  background: "#444",
  height: "100%"
};

const scrollStyle = {
  maxHeight: "400px",
  overflowY: "auto",
  marginBottom: "1rem",
  marginTop: "1rem",
  border: "1px solid #ccc",
  padding: "1rem",
};

export default FileParser;