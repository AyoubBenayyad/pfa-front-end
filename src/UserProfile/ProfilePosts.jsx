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
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

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
