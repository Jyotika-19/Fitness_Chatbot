import { useEffect, useRef } from "react";
const ChatForm = ({ setChatHistory, socket }) => {
  const inputRef = useRef();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    console.log(userMessage);

    //clearing input
    inputRef.current.value = "";

    // updating chat history with user's message
    setChatHistory((history) => [...history, { role: "user", text: userMessage }]);



    // emiting message to backend
    socket.emit("user-message", userMessage);
  };
  useEffect(() => {
    //listens for response from backend
    socket.on("bot-response", (botMessage) => {
      setChatHistory((history) => [...history, { role: "bot", text: botMessage }]);
    });
    return () => socket.off("bot-response");
  }, [socket, setChatHistory]);

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input ref={inputRef}
        type="text"
        placeholder="Type your Message..."
        className="message-input"
        required />
      <button className="material-symbols-rounded">send</button>
    </form>
  )
}




export default ChatForm
