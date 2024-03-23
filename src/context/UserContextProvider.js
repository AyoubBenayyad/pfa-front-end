// UserContextProvider.js
import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import { useLocalState } from "../Util/useLocalStorage";
import fetchService from "../Services/fetchService";
import { useNavigate } from "react-router-dom";

const UserContextProvider = ({ children }) => {
  const [jwt, setContextJwt] = useLocalState("", "token");
  const [isInitialized, setIsInitialized] = useState(jwt);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: null, // User ID (you can set this based on your authentication system)
    username: null,
    email: null, // User's username
    ImageURL: null, // URL to the user's profile image
  }); // Initialize with null or default user data
  const [userImage, setUserImage] = useState("");
  useEffect(() => {
    // Fetch user data from an API (replace with your actual API endpoint)
    if (jwt === "") {
      console.log("jwt still empty");
    } else {
      fetchService(
        "http://localhost:8080/api/v1/profile/contextUser",
        jwt,
        "GET"
      )
        .then((data) => {
          setUser(data);
          const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "image/png",
              Authorization: `Bearer ${jwt}`,
            },
          };

          fetch(`http://localhost:8080/images/${data.ImageURL}`, requestOptions)
            .then((response) => response.blob())
            .then((blob) => {
              setUserImage(URL.createObjectURL(blob));
            });
        })
        .catch((err) => {
          navigate("/login");
        });
    }
  }, [jwt]);

  // You can fetch user data from an API here if needed

  return (
    <UserContext.Provider value={{ user, setUser, setContextJwt, userImage }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
