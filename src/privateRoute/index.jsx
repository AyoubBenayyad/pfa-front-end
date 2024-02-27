import React, { useState } from "react";
import { useLocalState } from "../Util/useLocalStorage";
import { Navigate } from "react-router-dom";
import fetchService from "../Services/fetchService";


export default function PrivateRoute({children}){
const [isLoading,setIsLoading] = useState(true);
const [isValid,setIsValid] = useState(null);
    const [jwt,setJwt] = useLocalState("","token");
    
    if(jwt){
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: jwt,
              password: "",
            }),
          };
          fetch("http://localhost:8080/api/v1/auth/valide", requestOptions)
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                return response.text().then((text) => {
                });
              }
            })
            .then((isItValid) => {
                setIsValid(isItValid);
            setIsLoading(false);
            })
            .catch((err) => {
                alert(err);
            });
    }else{
    return <Navigate to="/login"/>;
    }
    return isLoading ? (<div>Loading...</div>) : isValid === true ? (children) : (<Navigate to="/login"/>);
}