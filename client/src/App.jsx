import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Chat from "./Chat";

const socket = io("ws://localhost:9013");


const UserForm= ({ onUserEnter }) => {
  const userRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    if (userRef.current) {
      onUserEnter(userRef.current.value);
    }
  };

  return (
    <form onSubmit={onSubmit} className="user-form">
      <input type="text" ref={userRef} />
      <button type="submit" style={{ marginLeft: '20px' }}>
        Set User
      </button>
    </form>
  );
};

function App() {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    socket.on("connection", () => {
      console.log("Connected to server");
    });
  }, []);

  const onUserEnter = (user) => {
    setCurrentUser(user);
    socket.emit("join", { username: user });
  };

  return (
    <div className="chat-app">
      <header>
      <h3>Fast messaging</h3>

      </header>
      <main className="chatapp">
      {!currentUser && (
        <UserForm onUserEnter={onUserEnter}/>
      )}

      {currentUser && <Chat socket={socket} currentUser={currentUser} />}
      </main>
    </div>
    
  );
}

export default App;
