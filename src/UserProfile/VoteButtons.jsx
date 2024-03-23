import React, { useEffect, useState } from "react";
import { useLocalState } from "../Util/useLocalStorage";
import fetchService from "../Services/fetchService";

export default function VoteButtons({ PostId }) {
  const [userVote, setUserVote] = useState(null);
  const [voteCount, setVoteCount] = useState(0);
  const [jwt, setJwt] = useLocalState("", "token");

  useEffect(() => {
    async function fetchData() {
      try {
        fetchService(
          `http://localhost:8080/api/v1/Vote/${PostId}/isVoted`,
          jwt,
          "GET"
        ).then((data) => {
          console.log(data.type);
          if (data.type === "NoVote") setUserVote(null);
          if (data.type === "UpVote") setUserVote("UpVote");
          if (data.type === "DownVote") setUserVote("DownVote");

          setVoteCount(data.mark);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  const handleUpVote = () => {
    if (userVote === "UpVote") {
      fetchService(
        `http://localhost:8080/api/v1/Vote/${PostId}/RemoveUpVote`,
        jwt,
        "POST"
      )
        .then((data) => {
          setUserVote(null);
          let newVoteCount = voteCount - 1;
          setVoteCount(newVoteCount);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (userVote === "DownVote") {
      fetchService(
        `http://localhost:8080/api/v1/Vote/${PostId}/UpVote`,
        jwt,
        "POST"
      )
        .then((data) => {
          setUserVote("UpVote");
          let newVoteCount = voteCount + 2;
          setVoteCount(newVoteCount);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetchService(
        `http://localhost:8080/api/v1/Vote/${PostId}/UpVote`,
        jwt,
        "POST"
      )
        .then((data) => {
          setUserVote("UpVote");
          let newVoteCount = voteCount + 1;
          setVoteCount(newVoteCount);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDownVote = () => {
    if (userVote === "DownVote") {
      fetchService(
        `http://localhost:8080/api/v1/Vote/${PostId}/RemoveDownVote`,
        jwt,
        "POST"
      )
        .then((data) => {
          setUserVote(null);
          let newVoteCount = voteCount + 1;
          setVoteCount(newVoteCount);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (userVote === "UpVote") {
      fetchService(
        `http://localhost:8080/api/v1/Vote/${PostId}/DownVote`,
        jwt,
        "POST"
      )
        .then((data) => {
          setUserVote("DownVote");
          let newVoteCount = voteCount - 2;
          setVoteCount(newVoteCount);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetchService(
        `http://localhost:8080/api/v1/Vote/${PostId}/DownVote`,
        jwt,
        "POST"
      )
        .then((data) => {
          setUserVote("DownVote");
          let newVoteCount = voteCount - 1;
          setVoteCount(newVoteCount);
        })
        .catch((err) => {
          console.log(err);
        });
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
          stroke="white">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
      <span className="text-2xl text-white font-bold">{voteCount}</span>
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
          stroke="white">
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
