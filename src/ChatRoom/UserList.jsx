import React, { useContext, useEffect, useState } from "react";

import UserContext from "../context/UserContext";
import { useLocalState } from "../Util/useLocalStorage";
import fetchService from "../Services/fetchService";
import UserButton from "./userButton";

const UserList = ({
  setChatWithId,
  userList,
  notificationId,
  LoggedUserId,
  fetchUsers,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [addUserList, setAddUserList] = useState([]);
  const [jwt, setContextJwt] = useLocalState("", "token");

  const addChat = () => {
    if (showModal) {
      setShowModal(false);
    } else {
      fetchService(
        `http://localhost:8080/api/v1/AddChat/${LoggedUserId}`,
        jwt,
        "GET"
      ).then((data) => {
        setAddUserList(data);
        setShowModal(true);
      });
    }

    fetchUsers();
  };
  return (
    <div className="w-1/4 bg-white border-r border-gray-300">
      {/* Sidebar Header */}
      <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
        <h1 className="text-2xl font-semibold">Chatt Web</h1>
        <div className="relative">
          <button
            id="menuButton"
            className="focus:outline-none"
            onClick={addChat}>
            <svg
              width="32px"
              height="32px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <circle
                opacity="0.5"
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {/* Menu Dropdown */}
        </div>
      </header>

      {/* Contact List */}
      {!showModal ? (
        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          {userList.map((user) => {
            return (
              <UserButton
                id={user.id}
                key={user.id}
                userName={user.userName}
                Image={user.image}
                setChatWithId={setChatWithId}
                notificationId={notificationId}></UserButton>
            );
          })}

          {/* Repeat the same structure for other contact entries */}
          {/* Ensure to update the data dynamically if needed */}
        </div>
      ) : (
        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          {addUserList.map((user, index) => {
            return (
              <UserButton
                id={user.id}
                key={index}
                userName={user.userName}
                Image={user.image}
                setChatWithId={setChatWithId}
                notificationId={notificationId}></UserButton>
            );
          })}

          {/* Repeat the same structure for other contact entries */}
          {/* Ensure to update the data dynamically if needed */}
        </div>
      )}
    </div>
  );
};

export default UserList;
