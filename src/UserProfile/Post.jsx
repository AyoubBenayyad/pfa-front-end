import React, { useEffect, useState } from "react";
import {
  MdComment,
} from "react-icons/md";
import VoteButtons from "./VoteButtons";
import { useLocalState } from "../Util/useLocalStorage";
import CommentSection from "./CommentSection";

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
  Type
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [jwt, setJwt] = useLocalState("", "token");

  const [Images, setImages] = useState([]);
  const[userImage,setUserImage] = useState(null);

  

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
    // You can perform any other actions here based on the button click
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
              className="object-cover w-12 h-12 rounded-full"
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
              <div className="flex text-sm gap-1">
                <span className="pt-0.5">
                <svg viewBox="0 0 24 24" height={24} width={24} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#D8D8F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#D8D8F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </span>
                <text className="text-slate-300 text-lg font-semibold ">{City}</text>
              </div>
          </div>
          <div className="flex gap-1">
            <span className="pt-1 pl-2">
          <svg fill="#a5a5a5" height={14} width={20} viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#a5a5a5" stroke-width="1.984"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.704"> <path d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z"></path> </g><g id="SVGRepo_iconCarrier"> <path d="M8.489 31.975c-0.271 0-0.549-0.107-0.757-0.316-0.417-0.417-0.417-1.098 0-1.515l14.258-14.264-14.050-14.050c-0.417-0.417-0.417-1.098 0-1.515s1.098-0.417 1.515 0l14.807 14.807c0.417 0.417 0.417 1.098 0 1.515l-15.015 15.022c-0.208 0.208-0.486 0.316-0.757 0.316z"></path> </g></svg>
            </span>
          <h5 className="text-sm font-bold underline text-slate-400">{Type}</h5>
          
          </div>
          
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
