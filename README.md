# Project Name: Fitness Chatbot

## Link to the chatbot:- https://fitnesschatbot-bxcresbve7e7f4gs.germanywestcentral-01.azurewebsites.net/?version=keyword

A conversational fitness chatbot implemented as a full-stack web application. It simulates human-like conversations in a Q&A format to guide users through fitness-related tasks such as creating personalized workout plans and answering fitness questions. The project is built using **React**, **Node.js**, **Socket.IO**, and **keyword-based intent detection**.

## Features

- **Conversational AI**: Text-based chatbot simulating Q&A-style conversations, focused on fitness and gym routines.
- **Keyword Spotting**: Simple intent detection using keyword recognition in text input.
- **Responsive UI**: Modern web design using React and Bootstrap 5, supporting all screen sizes.
- **Real-Time Communication**: Uses **WebSockets (Socket.IO)** for instant updates between frontend and backend.

## Tech Stack

### Frontend
- React 
- HTML5
- Bootstrap 5
- Socket.IO-client

### Backend
- Node.js (v22.14.0 LTS)
- Express.js
- Socket.IO (server)
- Custom keyword-based intent detection engine

## Deployment

- Hosted on **Microsoft Azure** using **Azure App Services**
- Secure communication via **SSL/TLS**
- Publicly accessible URL

## Getting Started (Local Setup)

```bash
# Start backend server
cd backend
node server.js

# Start frontend 
cd chatbot_front_end
npm start
