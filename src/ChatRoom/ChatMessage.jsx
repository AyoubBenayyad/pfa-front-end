import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";

function ChatMessage({ received, img, content }) {
  const { userImage } = useContext(UserContext);
  return (
    <>
      {received ? (
        <div className="flex mb-4 cursor-pointer">
          <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
            <img src={img} alt="User Avatar" className="w-8 h-8 rounded-full" />
          </div>
          <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
            <p className="text-gray-700">{content}</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-end mb-4 cursor-pointer">
          <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
            <p>{content}</p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
            <img
              src={userImage}
              alt="My Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ChatMessage;
