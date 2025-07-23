import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

function sendMessage() {
    const input = document.getElementById("InputMessage");
    const messages = document.getElementById("messages");

    const userMessage = input.value.trim();
    if (userMessage === "") return;

    // show user's message
    const userDiv = document.createElement("div");
    userDiv.textContent = "You: " + userMessage;
    userDiv.style.color = "white";
    messages.appendChild(userDiv);

    // clear input
    input.value = "";

    // show bot's response
    const botDiv = document.createElement("div");
    botDiv.textContent = "Bot: Please wait for a response...";
    botDiv.style.color = "lightgreen";
    messages.appendChild(botDiv);

    // scroll to bottom
    messages.scrollTop = messages.scrollHeight;
}
function appendMessage(sender, message) {
    const messagesDiv = document.getElementById('messages');
    const timestamp = new Date().toLocaleTimeString();

    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}</strong>: ${message} <span class="timestamp">${timestamp}</span>`;

    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
