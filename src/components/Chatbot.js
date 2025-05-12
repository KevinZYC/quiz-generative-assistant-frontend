import React from "react";

const Chatbot = ({ chatLog, chatInput, setChatInput, sendMessage }) => (
  <section style={sectionStyle}>
    <h2>3. Ask the Tutor</h2>
    <div style={chatLogStyle}>
      {chatLog.map((msg, idx) => (
        <p key={idx}>
          <strong>{msg.sender}:</strong> {msg.text}
        </p>
      ))}
    </div>
    <input
      type="text"
      value={chatInput}
      onChange={(e) => setChatInput(e.target.value)}
      style={{ width: "70%", marginRight: "1rem" }}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    />
    <button onClick={sendMessage}>Send</button>
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

const chatLogStyle = {
  maxHeight: "200px",
  overflowY: "auto",
  marginBottom: "1rem",
  border: "1px solid #ccc",
  padding: "1rem",
};

export default Chatbot;