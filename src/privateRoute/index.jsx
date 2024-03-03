import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useConnection } from "../Util/connection";


export default function PrivateRoute({children}){
const [isLoading,setIsLoading] = useState(true);
const [isValid,setIsValid] = useState(null);
    
    const connection = useConnection();
    useEffect(()=>{
      if(connection!== null){
        console.log("prv route: "+ connection);
        setIsValid(connection);
        setIsLoading(false);
      }
    },[connection]);
    
    return isLoading ? (<div>Loading...</div>) : isValid === true ? (children) : (<Navigate to="/login"/>);
}