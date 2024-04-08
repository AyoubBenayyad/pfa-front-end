import React, { useContext, useEffect, useState } from "react";
import { StompSessionProvider } from "react-stomp-hooks";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { useLocalState } from "../Util/useLocalStorage";
import ChatMessage from "./ChatMessage";
import UserList from "./UserList";
import fetchService from "../Services/fetchService";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

function Chat({ chatWithId, messageLog, stompClient, setMessageLog }) {
  const navigate = useNavigate();
  const [jwt, setContextJwt] = useLocalState("", "token");
  const [chatWith, setChatWith] = useState({});
  const [chatWidthImg, setChatWithImg] = useState(null);
  const [message, setMessage] = useState("");
  const { user: LoggedUser } = useContext(UserContext);

  // Include stompClient in dependency array
  function handleInputChange(e) {
    // Update the state when the input value changes
    setMessage(e.target.value);
  }
  useEffect(() => {
    if (LoggedUser.id === null || chatWithId === null) return;
    else {
      const fetchuserInfo = () => {
        try {
          //fetching user Infos
          fetchService(
            `http://localhost:8080/api/v1/messagingUserInfo/${chatWithId}`,
            jwt,
            "GET"
          ).then((data) => {
            setChatWith(data);

            const requestOptions = {
              method: "GET",
              headers: {
                "Content-Type": "image/png",
                Authorization: `Bearer ${jwt}`,
              },
            };
            fetch(`http://localhost:8080/images/${data.image}`, requestOptions)
              .then((response) => response.blob())
              .then((blob) => {
                setChatWithImg(URL.createObjectURL(blob));
              });
          });

          //fetching messages
        } catch (error) {
          navigate("/login");
        }
      };

      fetchuserInfo();
    }
  }, [stompClient, chatWithId, LoggedUser.id]);

  const sendMessage = () => {
    if (stompClient) {
      if (message.trim() !== "") {
        const chatMessageDto = {
          content: message,
          senderId: LoggedUser.id,
          recipientId: chatWithId,
        };
        stompClient.send("/app/chat", {}, JSON.stringify(chatMessageDto)); // Reuse the existing connection

        let newMsg = {
          content: message,
          id:
            messageLog.length > 0
              ? messageLog[messageLog.length - 1].id + 1
              : 0,
          senderId: LoggedUser.id,
          recipientId: chatWithId,
          timeStamp: new Date(),
        };
        const isDuplicateId = messageLog.some((msg) => msg.id === newMsg.id);
        if (!isDuplicateId) {
          setMessageLog((prevMessages) => [...prevMessages, newMsg]);
        }
        setMessage("");
      }
      // Clear the input field after sending the message
    } else {
      console.log("cant send message");
    }
  };

  return (
    <>
      <div className="flex-1">
        <header className="bg-white p-4 text-gray-700">
          <h1 className="text-2xl font-semibold">{chatWith.userName}</h1>
        </header>

        <div className="h-screen overflow-y-auto p-4 pb-36">
          {messageLog.map((message) => {
            if (message.senderId === LoggedUser.id) {
              return (
                <ChatMessage
                  key={message.id}
                  received={false}
                  content={message.content}
                  img={chatWidthImg}></ChatMessage>
              );
            } else {
              return (
                <ChatMessage
                  key={message.id}
                  received={true}
                  content={message.content}
                  img={chatWidthImg}></ChatMessage>
              );
            }
          })}

          <div style={{ height: "150px" }} />
        </div>

        <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
              value={message} // Bind input value to state
              onChange={handleInputChange} // Update state on input change
            />
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
              onClick={() => sendMessage()}>
              Send
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Chat;
