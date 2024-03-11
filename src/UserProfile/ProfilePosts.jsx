import React, { useEffect, useState } from "react";
import Post from "./Post";
import fetchService from "../Services/fetchService";
import { useLocalState } from "../Util/useLocalStorage";

export default function ProfilePosts({ profileImg }) {
  const [Posts, setPosts] = useState([]);
  const [jwt, setJwt] = useLocalState("", "token");

  useEffect(() => {
    fetchService(
      "http://localhost:8080/api/v1/profile/ProfilePosts",
      jwt,
      "GET"
    )
      .then((data) => {
        setPosts(data);
        console.log(data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const images = [
    "https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg",
    "https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg",
    "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/03/what-is-a-blog-1.webp",
    "https://st2.depositphotos.com/1350793/9161/i/450/depositphotos_91612518-stock-photo-blog-concept-with-man-holding.jpg",
  ];
  const domains = [
    "JavaScript",
    "React",
    "Software Enginnering",
    "JavaScript",
    "React",
    "Software Enginnering",
  ];
  return (
    <div className="flex flex-col gap-4">
      {Post.length === 0 ? (
        <>no posts available</>
      ) : (
        Posts.map((post) => (
          <Post
            key={post.postId}
            PostId={post.postId}
            PostImages={post.postImages}
            PostDate={post.postDate}
            PostUsername={post.postUsername}
            userImageUrl={profileImg}
            PostDomains={post.postDomains}
            PostTitle={post.postTitle}
            PostDescription={post.postDescription}></Post>
        ))
      )}
    </div>
  );
}
