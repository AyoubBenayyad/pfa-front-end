import { IconButton } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdComment,
  MdNavigateNext,
} from "react-icons/md";
import { FaComment, FaComments } from "react-icons/fa";
import VoteButtons from "./VoteButtons";
import { useLocalState } from "../Util/useLocalStorage";

function Post({
  userImageUrl,
  PostId,
  PostImages,
  PostDate,
  PostUsername,
  PostDomains,
  PostTitle,
  PostDescription,
}) {
  const [currentImage, setCurrentImage] = useState(0);

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
          <h3 className="mt- text-lg font-medium text-gray-900 dark:text-white">
            {PostTitle}{" "}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
            {PostDescription}
          </p>
        </div>
        <div className="pb-4 flex items-center justify-around pt-3 border-t-2 border-gray-500">
          <VoteButtons></VoteButtons>
          <div>
            <button
              className="hover:bg-gray-400  rounded p-2"
              style={{
                color:"white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}>
              <MdComment style={{ marginRight: "8px", color:"white", }} />
              comments
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Post;
