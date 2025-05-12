import React from "react";

const FileGenerator = ({ generateQuiz, quizUrl }) => (
  <section style={sectionStyle}>
    <h2>2. Retrieve Quiz</h2>
    <button onClick={generateQuiz}>Generate Quiz</button>
    {quizUrl && (
      <p>
        <a href={quizUrl} target="_blank" rel="noopener noreferrer">
          Download Quiz PDF
        </a>
      </p>
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

export default FileGenerator;