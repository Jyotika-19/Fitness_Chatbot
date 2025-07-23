import { useState, useEffect, useRef } from "react";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { io } from "socket.io-client";

const urlParams = new URLSearchParams(window.location.search);
const version = urlParams.get("version");

// different version to differen chatbot
const offlineMode = true;

const SOCKET_URL = offlineMode
  ? "http://localhost:3001"
  : (version === "keyword"
      ? "https://fitnesschatbotbackend-chczfdg7hjd7aagb.germanywestcentral-01.azurewebsites.net"
      : "https://fitnesschatbotapibackend-cjawfhbbdwhvdqgq.germanywestcentral-01.azurewebsites.net");

const socket = io(SOCKET_URL);

const ChatContainer = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const chatBodyRef = useRef(null);

  useEffect(() => {
  socket.on("connect", () => {
    console.log("Connected to socket server:", SOCKET_URL);
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err);
  });
},  [chatHistory]);

  return (
    <div className="chatbot-popup">
      <div className="chat-header">
        <div className="header-info">
          <ChatbotIcon />
          <h2 className="logo-text">Chatbot</h2>
        </div>

      </div>

      <div className="chat-body" ref={chatBodyRef}>
        <div className="message bot-message">
          {/* <ChatbotIcon /> */}

        </div>
        {chatHistory.map((chat, index) => (
          <ChatMessage key={index} chat={chat} />
        ))}
      </div>

      <div className="chat-footer">
        <ChatForm setChatHistory={setChatHistory} socket={socket} />
      </div>
    </div>
  );
};

export default ChatContainer;
