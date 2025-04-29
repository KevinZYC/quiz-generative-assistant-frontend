import React, { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:8000";

function App() {
  const [sessionId, setSessionId] = useState(() => crypto.randomUUID());
  const [summary, setSummary] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [quizUrl, setQuizUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadPDF = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("pdf_file", file);
    formData.append("session_id", sessionId);

    try {
      const res = await axios.post(`${API_BASE}/load`, formData);
      setSummary(res.data);
    } catch (err) {
      alert("Failed to upload and summarize PDF.");
    }
    setLoading(false);
  };

  const generateQuiz = async () => {
    try {
      const res = await axios.get(`${API_BASE}/generate_quiz`, {
        params: { session_id: sessionId },
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setQuizUrl(url);
    } catch (err) {
      alert("Failed to generate quiz.");
    }
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    const newChatLog = [...chatLog, { sender: "You", text: chatInput }];
    setChatLog(newChatLog);
    setChatInput("");

    try {
      const res = await axios.post(`${API_BASE}/chat`, {
        session_id: sessionId,
        message: chatInput,
      });
      const responseText = res.data.response || "No response.";
      setChatLog((prev) => [...prev, { sender: "Tutor", text: responseText }]);
    } catch (err) {
      alert("Chat request failed.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>LangChain Tutor</h1>

      {/* Section 1: Upload PDF */}
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

      {/* Section 2: Generate Quiz */}
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

      {/* Section 3: Chatbot */}
      <section style={sectionStyle}>
        <h2>3. Ask the Tutor</h2>
        <div style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
          {chatLog.map((msg, idx) => (
            <p key={idx}><strong>{msg.sender}:</strong> {msg.text}</p>
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
    </div>
  );
}

const sectionStyle = {
  border: "1px solid #ddd",
  padding: "1rem",
  marginBottom: "2rem",
  borderRadius: "8px",
  background: "#f9f9f9",
};

export default App;
