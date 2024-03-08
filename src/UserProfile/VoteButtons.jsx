import React, { useState } from "react";

export default function VoteButtons() {
  const [userVote, setUserVote] = useState(null);
  const [voteCount, setVoteCount] = useState(0);

  const handleUpVote = () => {
    if (userVote === "UpVote") {
      setUserVote(null);
      let newVoteCount = voteCount - 1;
      setVoteCount(newVoteCount);
    } else if (userVote === "DownVote") {
      setUserVote("UpVote");
      let newVoteCount = voteCount + 2;
      setVoteCount(newVoteCount);
    } else {
      setUserVote("UpVote");
      let newVoteCount = voteCount + 1;
      setVoteCount(newVoteCount);
    }
  };

  const handleDownVote = () => {
    if (userVote === "DownVote") {
      setUserVote(null);
      let newVoteCount = voteCount + 1;
      setVoteCount(newVoteCount);
    } else if (userVote === "UpVote") {
      setUserVote("DownVote");
      let newVoteCount = voteCount - 2;
      setVoteCount(newVoteCount);
    } else {
      setUserVote("DownVote");
      let newVoteCount = voteCount - 1;
      setVoteCount(newVoteCount);
    }
  };
  return (
    <div className="flex items-center space-x-4">
      <button
        className={
          userVote === "UpVote"
            ? "p-2 border-2 border-green-500  rounded-full hover:bg-gray-400"
            : "p-2 border  rounded-full hover:bg-gray-400"
        }
        onClick={handleUpVote}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${userVote === "UpVote" ? "text-green-500" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
      <span className="text-2xl font-bold">{voteCount}</span>
      <button
        className={
          userVote === "DownVote"
            ? "p-2 border-2 border-rose-500  rounded-full hover:bg-gray-400"
            : "p-2 border  rounded-full hover:bg-gray-400"
        }
        onClick={handleDownVote}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${
            userVote === "DownVote" ? "text-rose-500" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
}
