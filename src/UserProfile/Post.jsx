import { IconButton } from "@material-tailwind/react";
import React, { useState } from "react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdComment,
  MdNavigateNext,
} from "react-icons/md";
import { FaComment, FaComments } from "react-icons/fa";
import VoteButtons from "./VoteButtons";

function Post({ userImageUrl }) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    userImageUrl,
    "https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg",
    "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/03/what-is-a-blog-1.webp",
    "https://st2.depositphotos.com/1350793/9161/i/450/depositphotos_91612518-stock-photo-blog-concept-with-man-holding.jpg",
  ];
  const handleNextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
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
              src={userImageUrl}
              alt=""
            />
            <div className="-space-y-1">
              <h2 className="text-sm font-semibold">Ayoub Benayyad</h2>
              <span className="inline-block text-xs dark:text-gray-400">
                <time dateTime="2022-10-10">10th Oct 2022</time>
              </span>
            </div>
          </div>
          <button title="Open options" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current">
              {/* Add your SVG path data here */}
            </svg>
          </button>
        </div>
        <img
          alt=""
          src={images[currentImage]}
          style={{
            width: "100%", // Make the image responsive
            height: "auto",
            maxHeight: "600px", // Maintain aspect ratio
            objectFit: "cover", // Cover the container
          }}
        />
        {images.length > 1 && (
          <div className="mt-3 flex flex-row justify-center space-x-4">
            {images.map((item, index) => (
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
          <div className="mt-4 flex flex-wrap gap-1">
            <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600 dark:bg-purple-600 dark:text-purple-100">
              Snippet
            </span>
            <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600 dark:bg-purple-600 dark:text-purple-100">
              JavaScript
            </span>
          </div>
          <h3 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">
            How to position your furniture for positivity
          </h3>
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
            dolores, possimus pariatur animi temporibus nesciunt praesentium
            dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque
            minus soluta, voluptates neque explicabo tempora nisi culpa eius
            atque dignissimos. Molestias explicabo corporis voluptatem?
          </p>
        </div>
        <div className="pb-4 flex items-center justify-around pt-3 border-t-2 border-gray-500">
          <VoteButtons></VoteButtons>
          <div>
            <button
              className="hover:bg-gray-400  rounded p-2"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}>
              <MdComment style={{ marginRight: "8px" }} />
              comments
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Post;
