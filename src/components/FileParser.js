import React from "react";

const FileParser = ({ uploadPDF, loading, summary }) => (
  <section style={sectionStyle}>
    <h2>1. Upload PDF</h2>
    <input type="file" accept="application/pdf" onChange={uploadPDF} />
    {loading && <p>Loading summary...</p>}
    {summary && (
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(summary, null, 2)}
      </pre>
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

export default FileParser;