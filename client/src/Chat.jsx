import React, { useEffect, useState } from "react";

const Message = ({ message, currentUser }) => {
  const isCurrentUsersMessage = message.username === currentUser;
  return (
    <div>
      <div
        className="left"
        style={{
          display: "flex",
          flexDirection: isCurrentUsersMessage ? "row-reverse" : "row",
        }}
      >
        {message.type !== "join" && (
          <div className="user" style={{ margin: "4px" }}>
            <img
              alt={message.username}
              src="./avatar.webp"
              height="30px"
              width="30px"
              style={{ borderRadius: "100%" }}
            />
            <div className="username" style={{ color: "gray" }}>
              {message.username}
            </div>
          </div>
        )}
        <div
          className="message-des"
          style={{
            textAlign: isCurrentUsersMessage ? "right" : "left",
            margin: "10px 2px 2px 10px",
          }}
        >
          {message.message}
        </div>
      </div>
    </div>
  );
};

const Chat = ({ socket, currentUser }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("joinMessage", (message) => {
      console.log("got message", message);
      const isSameAsCurrentUser = currentUser === message.username;

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          username: message.username,
          message: `${
            isSameAsCurrentUser ? "You" : currentUser
          } have joined the chat.`,
          type: "join",
        },
      ]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("joinMessage");
    };
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("sendMessage", { username: currentUser, message });
      setMessage("");
    }
  };

  return (
    <div className="chatbox">
      <div className="message-box">
        {messages.map((item) => {
          return (
            <Message
              key={item.username}
              message={item}
              currentUser={currentUser}
            />
          );
        })}
      </div>
      <form className="message-form" onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
