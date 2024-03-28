import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useConnection } from "../Util/connection";
import { useLocalState } from "../Util/useLocalStorage";
import { useEffect, useState } from "react";
import fetchService from "../Services/fetchService";
import { debounce } from "lodash";
import UserContext from "../context/UserContext";

export const NavBar = () => {
  let searchTimer = null;
  const [isloading, setIsloading] = useState(false);
  const [isSearching, SetisSearching] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const { user: loggedUser } = useContext(UserContext);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const signout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const connection = useConnection();

  const navigate = useNavigate();
  const [jwt, setJwt] = useLocalState("", "token");

  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    if (connection) {
      fetchService("http://localhost:8080/api/v1/profile", jwt, "GET")
        .then((data) => {
          const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "image/png",
              Authorization: `Bearer ${jwt}`,
            },
          };

          fetch(`http://localhost:8080/images/${data.image}`, requestOptions)
            .then((response) => response.blob())
            .then((blob) => {
              setImageUrl(URL.createObjectURL(blob));
            })
            .catch((error) => {
              console.error("Error fetching image:", error);
            });
        })
        .catch((err) => {
          //alert(err);
        });

      return () => {};
    }
  }, [connection]);

  //this is the function to fetch users by first and last name async:
  async function fetchUsers(v1, v2) {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          fname: v1,
          lname: v2,
        }),
      };

      const response = await fetch(
        "http://localhost:8080/api/v1/search",
        requestOptions
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      setSearchedUsers(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const SearchUser = debounce((value) => {
    const names = value.trim();
    const flname = names.split(/\s+/);

    if (value.length > 0) {
      fetchUsers(flname[0], flname[1]);
    } else {
      SetisSearching(false);
      setIsloading(false);
    }
  }, 500);

  const SearchChange = (event) => {
    if (searchTimer) {
      clearTimeout(searchTimer);
    }

          if(event.target.value.length >0){
            SetisSearching(true);
            setIsloading(true);
            searchTimer = setTimeout(() => {
          SearchUser(event.target.value);
            }, 1000);
          }else{
            setSearchedUsers([]);
            SetisSearching(false);
          }
    }
      

  
  useEffect(() => {
    let isMounted = true;

    if (searchedUsers.length > 0) {
      let imageCount = 0;

      searchedUsers.forEach((profil) => {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "image/png",
            Authorization: `Bearer ${jwt}`,
          },
        };

        fetch(`http://localhost:8080/images/${profil.imageUrl}`, requestOptions)
          .then((response) => response.blob())
          .then((blob) => {
            imageCount++;
            const updatedTableData = searchedUsers.map((element) =>
              element.imageUrl === profil.imageUrl
                ? { ...element, imageUrl: URL.createObjectURL(blob) }
                : element
            );

            if (isMounted && imageCount === searchedUsers.length) {
              setSearchedUsers(updatedTableData);
              setIsloading(false);
            }
          })
          .catch((error) => {
            console.error("Error fetching image:", error);
            imageCount++;
            if (isMounted && imageCount === searchedUsers.length) {
              setIsloading(false);
            }
          });
      });
    } else {
      setIsloading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [searchedUsers]);

  return (
    <header className="p-4 dark:bg-gray-900 dark:text-gray-100 sticky z-10 top-0 ">
      <div className="container flex justify-between h-6 mx-auto">
        <div
          rel="noopener noreferrer"
          onClick={()=>{navigate("/home")}}
          aria-label="Back to homepage"
          className="flex items-center p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 32 32"
            className="w-8 h-8 cursor-pointer dark:text-violet-400">
            <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742zM27.383 21.961c0 0.389-0.211 0.73-0.526 0.914l-0.004 0.002-10.324 5.961c-0.152 0.088-0.334 0.142-0.53 0.142s-0.377-0.053-0.535-0.145l0.005 0.002-10.324-5.961c-0.319-0.186-0.529-0.527-0.529-0.916v-11.922c0-0.389 0.211-0.73 0.526-0.914l0.004-0.002 10.324-5.961c0.152-0.090 0.334-0.143 0.53-0.143s0.377 0.053 0.535 0.144l-0.006-0.002 10.324 5.961c0.319 0.185 0.529 0.527 0.529 0.916z"></path>
            <path d="M22.094 19.451h-0.758c-0.188 0-0.363 0.049-0.515 0.135l0.006-0.004-4.574 2.512-5.282-3.049v-6.082l5.282-3.051 4.576 2.504c0.146 0.082 0.323 0.131 0.508 0.131h0.758c0.293 0 0.529-0.239 0.529-0.531v-0.716c0-0.2-0.11-0.373-0.271-0.463l-0.004-0.002-5.078-2.777c-0.293-0.164-0.645-0.26-1.015-0.26-0.39 0-0.756 0.106-1.070 0.289l0.010-0.006-5.281 3.049c-0.636 0.375-1.056 1.055-1.059 1.834v6.082c0 0.779 0.422 1.461 1.049 1.828l0.009 0.006 5.281 3.049c0.305 0.178 0.67 0.284 1.061 0.284 0.373 0 0.723-0.098 1.027-0.265l-0.012 0.006 5.080-2.787c0.166-0.091 0.276-0.265 0.276-0.465v-0.716c0-0.293-0.238-0.529-0.529-0.529z"></path>
          </svg>
        </div>

        {connection && (
          <>
            <div className="max-w-md mx-auto">
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  onChange={SearchChange}
                  className="block w-96 h-8  ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search profils"
                />

                {isSearching && (
                  <>
                    <div className="absolute right-0 z-20 w-96 max-h-52 py-2 mt-2 overflow-y-auto origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800">
                      {!isloading &&
                        searchedUsers.length > 0 &&
                        searchedUsers.map((users, index) => (
                          <React.Fragment key={index}>
                            <div
                              key={users.id}
                              onClick={()=>{SetisSearching(false); navigate(`/UsersProfile/${users.id}`)}}
                              className="flex cursor-pointer items-center px-3 -mt-2  text-sm text-stone-950 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                              <button>
                                <img
                                  className="object-cover w-12 h-12 rounded-full mr-4 top-0"
                                  src={users.imageUrl}
                                />
                              </button>
                              <div className="">
                                <h1 className="text-sm mt-2 p-0 font-semibold text-stone-950 dark:text-black dark:hover:text-white">
                                  {users.fullName}
                                </h1>
                                <h3 className="text-sm mb-2 dark:text-black dark:hover:text-white">
                                  {users.email}
                                </h3>
                              </div>
                            </div>
                            <hr className="border-t border-gray-700 my-0" />
                          </React.Fragment>
                        ))}
                      {!isloading && searchedUsers.length === 0 && (
                        <>
                          <div className="">
                            <h1 className="text-xl mt-2 ml-6 p-1 font-semibold text-stone-950 ">
                              No user found.
                            </h1>
                          </div>
                        </>
                      )}
                      {isloading && (
                        <>
                          <div class="py-2 rounded shadow-md   animate-pulse dark:bg-white">
                            <div class="flex p-1 space-x-4 ">
                              <div class="flex-shrink-0 w-12 h-12 rounded-full dark:bg-gray-300"></div>
                              <div class="flex-1 py-2 space-y-1">
                                <div class="w-32 h-3 rounded dark:bg-gray-300"></div>
                                <div class="w-44 h-3 rounded dark:bg-gray-300"></div>
                              </div>
                            </div>
                          </div>
                          <div class="py-2 rounded shadow-md   animate-pulse dark:bg-white">
                            <div class="flex p-1 space-x-4 ">
                              <div class="flex-shrink-0 w-12 h-12 rounded-full dark:bg-gray-300"></div>
                              <div class="flex-1 py-2 space-y-1">
                                <div class="w-32 h-3 rounded dark:bg-gray-300"></div>
                                <div class="w-44 h-3 rounded dark:bg-gray-300"></div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        <div className="flex items-center md:space-x-4">
          <div className="relative">
            {connection && (
              <>
                <h3 className="text-lg">{loggedUser.username}</h3>
              </>
            )}
          </div>
          {!connection && (
            <>
              <button
                type="button"
                onClick={() => {
                  navigate("/signup");
                }}
                className="hidden px-6 py-2 font-semibold rounded lg:block dark:bg-violet-400 dark:text-gray-900">
                Sign up
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate("/login");
                }}
                className="hidden px-6 py-2 font-semibold rounded lg:block dark:bg-indigo-800 dark:text-gray-300">
                Log in
              </button>
            </>
          )}
          {connection && (
            <div className="relative inline-block">
              <button onClick={toggleDropdown}>
                <img
                  className="object-cover w-8 h-8 rounded-full"
                  src={imageUrl}
                  alt=""
                />
              </button>
              {isOpen && (
                <div
                  onClick={closeDropdown}
                  className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800">
                  <div className="flex items-center px-3 py-1 -mt-2 text-sm  transition-colors duration-300 transform  dark:hover:text-white dark:hover:bg-gray-700 ">
                    <div className="mx-1  dark:hover:text-white">
                      <h1 className="text-sm font-semibold  dark:text-black ">
                        {loggedUser.username}
                      </h1>
                      <p className="text-sm  dark:text-black ">
                        {loggedUser.email}
                      </p>
                    </div>
                  </div>

                  <hr className="border-gray-200 dark:border-gray-700  p-0" />

                  <div
                    onClick={() => {
                      navigate("/profile");
                    }}
                    className="block px-4 py-1 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-slate-950 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span>View Profile</span>
                  </div>

                  <div className="block px-4 py-1 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-slate-950 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                    Settings
                  </div>

                  <hr className="border-gray-200 dark:border-gray-700 p-0 " />

                  <div className="block px-4 py-1 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-slate-950 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                    Help
                  </div>

                  <div
                    onClick={signout}
                    className="block px-4 py-1 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-slate-950 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                    Sign Out
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
