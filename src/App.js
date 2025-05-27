import React, { useState } from "react";
import axios from "axios";
import FileParser from "./components/FileParser";
import FileGenerator from "./components/FileGenerator";
import Chatbot from "./components/Chatbot";

const API_BASE = "https://quiz-generative-assistant-render.onrender.com";



function App() {
    // ... existing state and function definitions
    const [sessionId, setSessionId] = useState(() => crypto.randomUUID());
    const [summary, setSummary] = useState(null);
    const [summaryText, setSummaryText] = useState(null);
    const [chatInput, setChatInput] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const [quizUrl, setQuizUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadPDF = async (e) => {
        console.log("uploadPDF called");
        const file = e.target.files[0];
        if (!file) return;
        setLoading(true);

        const formData = new FormData();
        formData.append("pdf_file", file);
        formData.append("session_id", sessionId);

        try {
            const res = await axios.post(`${API_BASE}/load`, formData);
            const parsed = JSON.parse(res.data); // Parse once
            setSummary(parsed);
            //setSummaryText(res.data);

            // Now you can safely log after parsing
            var summaryString = ""
            parsed.forEach((item, index) => {
                summaryString += "Page " + item.page + ": " + item.content + "\n"
                console.log("Page:", item.page);
                console.log("Content:", item.content);
            });
            setSummaryText(summaryString)
        } catch (err) {
            alert("Failed to upload and summarize PDF.");
            console.log(err);
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
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <h1>LangChain Tutor</h1>
            <div style={{ display: "flex", gap: "1rem" , flex: 1}}>
                <div style={{width: "30%", height: "67%"}}>
                    <FileParser uploadPDF={uploadPDF} loading={loading} summary={summaryText} />
                </div>
                <div style={{width: "40%", height: "67%"}}>
                    <FileGenerator generateQuiz={generateQuiz} quizUrl={quizUrl} />
                </div>
                <div style={{width: "30%", height: "67%"}}>
                    <Chatbot
                    chatLog={chatLog}
                    chatInput={chatInput}
                    setChatInput={setChatInput}
                    sendMessage={sendMessage}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
