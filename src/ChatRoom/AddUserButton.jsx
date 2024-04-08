import React, { useEffect, useState } from "react";
import { useLocalState } from "../Util/useLocalStorage";

export default function AddUserButton({
  id,
  userName,
  Image,
  setChatWithId,
  notificationId,
}) {
  const [jwt, setContextJwt] = useLocalState("", "token");
  const [userImg, setUserImg] = useState(null);
  const [isNotified, setIsNotified] = useState(false);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "image/png",
        Authorization: `Bearer ${jwt}`,
      },
    };
    fetch(`http://localhost:8080/images/${Image}`, requestOptions)
      .then((response) => response.blob())
      .then((blob) => {
        setUserImg(URL.createObjectURL(blob));
      });

    if (notificationId.length > 0 && notificationId.includes(id)) {
      setIsNotified(true);
    }
  }, [notificationId]);
  return (
    <div
      className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md "
      onClick={() => {
        setIsNotified(false);
        setChatWithId(id);
      }}>
      <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
        <img
          src={userImg}
          alt="user profile"
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{userName}</h2>
        {isNotified && (
          <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            NEW
          </span>
        )}
      </div>
    </div>
  );
}
