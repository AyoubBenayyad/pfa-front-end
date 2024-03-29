import React from 'react'
import { jwtDecode } from 'jwt-decode';
import { useLocalState } from './useLocalStorage';
import { Navigate } from "react-router-dom";

export default function PrivateAuth({authority,children}) {
    
    const [jwt, setJwt] = useLocalState("", "token"); 
    const decodedToken =  jwtDecode(jwt);
    const userRoles = decodedToken.roles;
  

     function AuthorityCheck(auth) {
        for (const element of userRoles) {
            if (element.authority === auth) {
                return true;
            }
        }
        return false;
    }

  return   AuthorityCheck(authority) ? (children) :  authority==="USER" ? (<Navigate to="/dashboard"/>) : (<Navigate to="/home"/>);
}
