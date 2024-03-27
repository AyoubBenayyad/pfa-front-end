import React, { useEffect, useState } from "react";
import { getTimeDifference } from "../Util/getTimeDifference";
import { useLocalState } from "../Util/useLocalStorage";
import { Link } from "react-router-dom";

function Comment({
  commentImg,
  commentDate,
  commentText,
  commentUsername,
  commentId,
  userId,
}) {
  const [jwt, setJwt] = useLocalState("", "token");
  const [userImage, setUserImage] = useState(null);
  const [timeDiff, setTimeDiff] = useState(getTimeDifference(commentDate));
  useEffect(() => {
    if (commentImg !== "") {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "image/png",
          Authorization: `Bearer ${jwt}`,
        },
      };

      fetch(`http://localhost:8080/images/${commentImg}`, requestOptions)
        .then((response) => response.blob())
        .then((blob) => {
          setUserImage(URL.createObjectURL(blob));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeDiff = getTimeDifference(commentDate);
      setTimeDiff(newTimeDiff);
    }, 60000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);
  return (
    <article className="p-6 mb-3 text-base bg-gray-900 border-t  border-gray-500  dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-white font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src={userImage}
              alt="Michael Gough"
            />
            <Link
              to={`/UsersProfile/${userId}`}
              style={{ textDecoration: "none", color: "whitesmoke" }}
              className="text-left m-0">
              {commentUsername}
            </Link>
          </p>
          <p className="text-sm text-gray-400">
            <time pubdate dateTime="2022-02-08" title="February 8th, 2022">
              {timeDiff}
            </time>
          </p>
        </div>
        <button
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400  bg-gray-900 rounded-lg hover:bg-gray-700 focus:ring-gray-600 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button">
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3">
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
          <span className="sr-only">Comment settings</span>
        </button>
      </footer>
      <p className="text-gray-600 dark:text-gray-400">{commentText}</p>
      <div className="flex items-center mt-4 space-x-4">
        <button
          type="button"
          className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-500 font-medium">
          <svg
            className="mr-1.5 w-3.5 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 18">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
            />
          </svg>
          Reply
        </button>
      </div>
    </article>
  );
}

export default Comment;
