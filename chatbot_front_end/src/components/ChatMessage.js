import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ chat }) => {
  return (
    <div className={`message ${chat.role === "user" ? "user-message" : "bot-message"}`}>
      {chat.role !== "user" && <ChatbotIcon />}
      <p className="message-text">
        {chat.text}
      </p>
    </div>
  );
};

export default ChatMessage;

