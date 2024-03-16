import React, { useEffect, useState } from "react";
import Post from "../UserProfile/Post";

export default function HomePosts({ posts },{load}) {

  return (
    <div className="flex flex-col gap-4">
      {posts.length === 0  ? (
        <>no posts available</>
      ) : (
        
        posts.map((post,index) => (
          <>
          <Post
            key={index}
            PostId={post.id}
            PostImages={post.photos}
            PostDate={post.publicationDate}
            PostUsername={post.userInfos.fullName ? post.userInfos.fullName : "" }
            userImageUrl={post.userInfos.image}
            PostDomains={post.domains}
            PostTitle={post.title}
            PostDescription={post.description}>
            </Post>
            {load && (
              <React.Fragment>
                <h1>loading....Please wait</h1>
              </React.Fragment>
            )}
           </>
        ))
      )}
    </div>
  );
}
