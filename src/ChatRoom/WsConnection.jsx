import React, { useContext, useEffect, useState } from "react";
import { useLocalState } from "../Util/useLocalStorage";
import UserContext from "../context/UserContext";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import fetchService from "../Services/fetchService";
import Chat from "./Chat";
import UserList from "./UserList";

function WsConnection() {
  const [connected, setConnected] = useState(false);
  const [jwt, setContextJwt] = useLocalState("", "token");
  const [stompClient, setStompClient] = useState(null);
  const { user: LoggedUser } = useContext(UserContext);
  const [userList, setUserList] = useState([]);
  const [chatWithId, setChatWithId] = useState(null);
  const [messageLog, setMessageLog] = useState([]);
  const [notificationId, setNotificationId] = useState([]);
  // connection useEffect
  useEffect(() => {
    const connect = () => {
      const socket = new SockJS("http://localhost:8080/ws", null, {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      const client = Stomp.over(socket);

      client.connect(
        {},
        () => {
          console.log("connected");
          setConnected(true);
          setStompClient(client);
        },
        (err) => {
          //console.error(err);
        }
      );
    };

    if (!stompClient) {
      // Connect only if stompClient is not set
      connect();
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect();
        setStompClient(null);
        setConnected(false);
      }
    };
  }, [connected, stompClient]);

  useEffect(() => {
    let subscription = null;
    if (stompClient && LoggedUser.id != null) {
      subscription = stompClient.subscribe(
        `/user/${LoggedUser.id}/queue/messages`,
        (payload) => {
          fetchUsers();
          const message = JSON.parse(payload.body);
          console.log("data received");
          if (message.senderId === chatWithId) {
            let newMsg = {
              content: message.content,
              id: message.id,
              senderId: message.senderId,
              recipientId: message.recipientId,
              timeStamp: new Date(),
            };
            const isDuplicateId = messageLog.some(
              (msg) => msg.id === newMsg.id
            );
            if (!isDuplicateId) {
              setMessageLog((prevMessages) => [...prevMessages, newMsg]);
            }
          } else {
            setNotificationId((prevNotification) => [
              ...prevNotification,
              message.senderId,
            ]);
          }
        }
      );
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [stompClient, chatWithId, LoggedUser.id]);

  const fetchUsers = () => {
    fetchService(
      `http://localhost:8080/api/v1/UsersList/${LoggedUser.id}`,
      jwt,
      "GET"
    )
      .then((data) => {
        setUserList(data);
        console.log("data fetched again");
        if (data.length !== 0) {
          if (chatWithId == null) {
            setChatWithId(data[0].id);
          }
        }
        //console.log(userList);
      })
      .catch((err) => {
        //console.error(err);
      });
  };
  //fetch users List
  useEffect(() => {
    if (LoggedUser.id === null) {
      return;
    } else {
      fetchUsers();
    }

    return () => {};
  }, [LoggedUser.id]);

  //fetch messages
  useEffect(() => {
    if (chatWithId != null && LoggedUser.id) {
      fetchService(
        `http://localhost:8080/api/v1/messages/${chatWithId},${LoggedUser.id}`,
        jwt,
        "GET"
      )
        .then((data) => {
          setMessageLog(data);
        })
        .catch((err) => {
          //console.error(err);
        });
    }
  }, [chatWithId, LoggedUser.id]);

  useEffect(() => {
    console.log(messageLog);
  }, [messageLog]);

  return (
    <div className="flex h-screen overflow-hidden">
      <UserList
        setChatWithId={setChatWithId}
        userList={userList}
        notificationId={notificationId}
        LoggedUserId={LoggedUser.id}
        fetchUsers={fetchUsers}></UserList>
      <Chat
        stompClient={stompClient}
        chatWithId={chatWithId}
        fetchUsers={fetchUsers}
        messageLog={messageLog}
        setMessageLog={setMessageLog}></Chat>
    </div>
  );
}

export default WsConnection;
