import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocalState } from "../Util/useLocalStorage";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { NavBar } from "../NavBars/Nav";
import Success from "./Success";
import Error from "./Error";
export const LLogin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [jwt, setJwt] = useLocalState("", "token");
    const [showError, setShowError] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const { setContextJwt } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
      setContextJwt(jwt);
    }, [jwt]);
    useEffect(() => {
      if (error && !showError) {
        setShowError(true);
        const timer = setTimeout(() => {
          setShowError(false);
          setError("");
        }, 2000);
  
        // Clear the timeout if the component unmounts
        return () => clearTimeout(timer);
      }
    }, [error]);
    const EmailValidation = (email) => {
      return String(email)
        .toLowerCase()
        .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    };
    function sendLoginRequest() {
      if (!EmailValidation(username) || password === "") {
        setError("Please Enter All Fields");
      } else {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        };
        fetch("http://localhost:8080/api/v1/auth/authenticate", requestOptions)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return response.text().then((text) => {
                throw new Error(text);
              });
            }
          })
          .then((token) => {
            setShowSucess(true);
            setShowError(false);
  
            setTimeout(() => setShowSucess(false), 2000);
            setJwt(token.token);
            setTimeout(() => navigate("/home"), 500);
          })
          .catch((err) => {
            setError("Enable to login");
          });
      }
    }


    return (
        <>
        <NavBar/>
      <div className="relative">
        <img
          src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
          className="absolute inset-0 object-cover w-full h-full"
          alt=""
        />
        <div className="relative bg-opacity-40 bg-slate-600">
          <svg
            className="absolute inset-x-0 bottom-0 text-white"
            viewBox="0 0 1160 162"
          >
            <path
              fill="currentColor"
              d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
            />
          </svg>
          <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col items-center justify-between xl:flex-row">
              <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                <h2 className="max-w-full mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                ENSAF Connect helps you connect &  <br className="hidden md:block" />
                share with your collegues
                </h2>
                <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                  The first plateform 100% dedicated to ensaf student <br className="hidden md:block" />
                  Find exclusif jobs and internships.
                </p>
                <div
                  onClick={()=>{navigate("/")}}
                  className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700"
                >
                  Learn more
                  <svg
                    className="inline-block w-3 ml-2"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                  </svg>
                </div>
              </div>
              <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                  <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                    Login to Your Account
                  </h3>

                  {showError && (
                    <Error Msg={error}/>
                    )}
                    {showSucess && (
                        <Success Msg={"Logged In Succefully"} />
                        
                    )}

                  <div>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="firstName"
                        className="inline-block mb-1 font-medium"
                      >
                        Email Address
                      </label>
                      <input
                        placeholder="Enter email address"
                        required
                        type="email"
                        value={username ? username : ""}
                        onChange={(event) => setUsername(event.target.value)}
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="firstName"
                        name="firstName"
                      />
                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="password"
                        className="inline-block mb-1 font-medium"
                      >
                        Password
                      </label>
                      <input
                        placeholder="Enter Password"
                        required
                        type="password"
                        value={password ? password : ""}
                        onChange={(event) => setPassword(event.target.value)}
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="lastName"
                        name="lastName"
                      />
                    </div>
                    <div className="mt-4 mb-2 sm:mb-4">
                      <button
                        type="submit"
                        onClick={() => sendLoginRequest()}
                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-500 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
                      >
                        Login
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 sm:text-sm">
                      Don't have an account? <span className='px-1 underline cursor-pointer text-blue-500 hover:text-blue-800' onClick={()=>{navigate("/signup")}}>sign up</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      </>
    );
  };