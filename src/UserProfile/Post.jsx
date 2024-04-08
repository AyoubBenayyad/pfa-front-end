import React, { useEffect, useState } from "react";
import {
  MdComment,
} from "react-icons/md";
import VoteButtons from "./VoteButtons";
import { useLocalState } from "../Util/useLocalStorage";
import CommentSection from "./CommentSection";
import { useNavigate } from "react-router-dom";

function Post({
  userImageUrl,
  PostId,
  PostImages,
  PostDate,
  PostUsername,
  PostDomains,
  PostTitle,
  PostDescription,
  City,
  Type,
  UserId,
  Bookmarked
}) {
  
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [jwt, setJwt] = useLocalState("", "token");

  const [Images, setImages] = useState([]);
  const[userImage,setUserImage] = useState(null);

const [toggle,setToggle] = useState(Bookmarked);

  const empty = ()=>{}
  async function unbookmark(id,requestOptions) {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/unbookmark/${id}`, requestOptions);
    } catch (e) {
    }
  }
  async function bookmark(id,requestOptions) {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/bookmark/${id}`, requestOptions);
    } catch (e) {
    }
  }
  
  const Bookmarkfcn = (id,Bookmarked)=>{
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      }
    };
    if(Bookmarked){
      unbookmark(id,requestOptions);
    }else{
      bookmark(id,requestOptions);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchPromises = PostImages.map(async (imageUrl) => {
          const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "image/png",
              Authorization: `Bearer ${jwt}`,
            },
          };
          const response = await fetch(
            `http://localhost:8080/images/${imageUrl}`,
            requestOptions
          );
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        });

        const imageUrls = await Promise.all(fetchPromises);
        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchData();
    //fetch user image:
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "image/png",
        Authorization: `Bearer ${jwt}`,
      },
    };
    
    fetch(`http://localhost:8080/images/${userImageUrl}`, requestOptions)
            .then((response) => response.blob())
            .then((blob) => {
              setUserImage(URL.createObjectURL(blob));
            })
            .catch((error) => {
              console.error("Error fetching image:", error);
            });
  }, []);

  const handleNextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % Images.length);
  };

  const handleButtonClick = (position) => {
    setCurrentImage(position);
  };
  return (
    <div className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] dark:shadow-gray-700/25 ">
      <article
        className="overflow-hidden rounded-lg shadow transition hover:shadow-lg"
        style={{
          backgroundColor: "#242526",
        }}>
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center space-x-2">
            <img
            onClick={()=>{(UserId && UserId!=="") ? navigate(`/UsersProfile/${UserId}`) : empty() }}
              className="object-cover cursor-pointer w-12 h-12 rounded-full"
              src={userImage}
              alt=""
            />
            <div className="-space-y-1">
              <h2 className="text-sm font-semibold text-white">{PostUsername}</h2>
              <span className="inline-block text-xs dark:text-gray-400">
                <time dateTime="2022-10-10">{PostDate}</time>
              </span>
            </div>
          </div>
         {typeof Bookmarked !== 'undefined' && Images.length > 1  && (<div className="cursor-pointer" onClick={()=>{Bookmarkfcn(PostId,toggle) ; setToggle(!toggle)}}>
            {toggle ? ( <svg
                height={24}
                width={24}
                viewBox="-4 0 30 30"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <defs></defs>
                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" >
                    <g id="Icon-Set-Filled" transform="translate(-419.000000, -153.000000)" fill="#FFFFFF">
                      <path
                        d="M437,153 L423,153 C420.791,153 419,154.791 419,157 L419,179 C419,181.209 420.791,183 423,183 L430,176 L437,183 C439.209,183 441,181.209 441,179 L441,157 C441,154.791 439.209,153 437,153"
                        id="bookmark"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>) : 
              (<svg height={24} width={24} viewBox="-4 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg"   fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">  <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" > <g id="Icon-Set"  transform="translate(-417.000000, -151.000000)" fill="#ffffff"> <path d="M437,177 C437,178.104 436.104,179 435,179 L428,172 L421,179 C419.896,179 419,178.104 419,177 L419,155 C419,153.896 419.896,153 421,153 L435,153 C436.104,153 437,153.896 437,155 L437,177 L437,177 Z M435,151 L421,151 C418.791,151 417,152.791 417,155 L417,177 C417,179.209 418.791,181 421,181 L428,174 L435,181 C437.209,181 439,179.209 439,177 L439,155 C439,152.791 437.209,151 435,151 L435,151 Z" id="bookmark" > </path> </g> </g> </g></svg>)}
          </div>
          )}
        </div>
        <img
          alt=""
          src={Images[currentImage]}
          style={{
            width: "100%", // Make the image responsive
            height: "auto",
            maxHeight: "600px", // Maintain aspect ratio
            objectFit: "cover", // Cover the container
          }}
        />
        {Images.length > 1 && (
          <div className="mt-3 flex flex-row justify-center space-x-4">
            {Images.map((item, index) => (
              <button
                className="bg-gray-200 h-4 w-4 rounded-full hover:bg-gray-400"
                key={index}
                label={`Button ${index + 1}`}
                onClick={() => handleButtonClick(index)}
              />
            ))}
          </div>
        )}
        <div className="p-4 pt-1 sm:p-6 pb-2">
        <div className="mt-4  mb-3 flex flex-wrap gap-1">
            {PostDomains.map((post,index) => (
              <span key={index} className="whitespace-nowrap rounded-full  bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600 dark:bg-purple-600 dark:text-purple-100">
                {post}
              </span>
            ))}
          </div>
         
          <div className="flex justify-between  ">
              <h3 className="mt- text-lg font-medium text-gray-900 dark:text-white">
                {PostTitle}{" "}
              </h3>
              {City && City!== null && (
                <div className="flex text-sm gap-1">
                <span className="pt-0.5">
                <svg viewBox="0 0 24 24" height={24} width={24} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#D8D8F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#D8D8F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </span>
                <text className="text-slate-300 text-lg font-semibold ">{City}</text>
              </div>
              )}
          </div>
          
          {Type !== null && Type && (
            <div className="flex gap-1">
            <span className="pt-1 pl-2">
            <svg fill="#a5a5a5" height={14} width={20} viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#a5a5a5" stroke-width="1.984"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.704"> <path d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z"></path> </g><g id="SVGRepo_iconCarrier"> <path d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z"></path> </g></svg>
              </span>
            <h5 className="text-sm font-bold underline text-slate-400">{Type}</h5>
            </div>
          )}
          
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
            {PostDescription}
          </p>
         
        </div>
        <div className="pb-4 flex items-center justify-around pt-3 border-t-2 border-gray-500">
          <VoteButtons PostId={PostId}></VoteButtons>
          <div>
            <button
              className="hover:bg-gray-400  rounded p-2"
              style={{
                color:"white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}
              onClick={() => setShowModal(!showModal)}>
              <MdComment style={{ marginRight: "8px" }} />
              comments
            </button>
          </div>
        </div>
        {showModal && (
          <CommentSection
            PostId={PostId}
            showModal={showModal}
            setShowModal={setShowModal}></CommentSection>
        )}
      </article>
    </div>
  );
}

export default Post;
