import { useEffect, useState } from "react";
import { useLocalState } from "../Util/useLocalStorage";
import fetchService from "../Services/fetchService";
import Post from "../UserProfile/Post";

export default function UsersProfilePosts({ profileImg, userId }) {
  const [Posts, setPosts] = useState([]);
  const [jwt, setJwt] = useLocalState("", "token");

  useEffect(() => {
    fetchService(
      `http://localhost:8080/api/v1/profile/OthersProfilePosts/${userId}`,
      jwt,
      "GET"
    )
      .then((data) => {
        setPosts(data);
        console.log(data)
      })
      .catch((err) => {
        alert(err);
      });
  }, [userId]);

  return (
    <div className="flex flex-col gap-4">
      {Posts.length === 0 ? (
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
            PostDescription={post.postDescription}
            City={post.city}
            Type={post.type}
            Bookmarked={post.bookmarked}
            ></Post>
        ))
      )}
    </div>
  );
}
