const Chat = () => {
    return (
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
    );
}

export default Chat;