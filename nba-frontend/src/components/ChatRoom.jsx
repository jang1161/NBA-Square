import React, { useEffect, useState } from "react";
import { connect, sendMessage } from "../utils/socket";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    connect((message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = {
      sender: localStorage.getItem("user_name"),
      content: input,
      type: "CHAT"
    };
    sendMessage(msg);
    setInput("");
  };

  return (
    <div>
      <h2>💬 채팅방 💬 현재 로그인: {localStorage.getItem("user_name")}</h2>
      <div style={{ border: "1px solid #ccc", height: "300px", overflowY: "scroll", padding: "8px" }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="메시지를 입력하세요" />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
