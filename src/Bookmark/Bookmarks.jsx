import React, { useEffect, useState } from 'react';
import Post from '../UserProfile/Post';
import { useLocalState } from '../Util/useLocalStorage';
import { NavBar } from '../NavBars/Nav';
import SideBar from '../NavBars/Side';

export default function Bookmarks() {
const [isLoading,setIsLoading] = useState(false);
const [posts,setPosts] = useState([]);
const [jwt,set] = useLocalState("","token");

    const fetchData = async () => {
        
          setIsLoading(true);
        
          try {
            const requestOptions = {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
              }
            };
        
            const response = await fetch("http://localhost:8080/api/v1/bookmarkedPosts", requestOptions);
        
            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(errorText);
            }
        
            const data = await response.json();
            
            setPosts(data);
             
            
          } catch (error) {
          }
          setIsLoading(false);
        
        };

 useEffect(()=>{
    fetchData();
 },[]);
  return (
    <div className="bg-gray-200 min-h-screen bg-cover bg-no-repeat bg-fixed bg-center flex flex-col">
    <NavBar/>
    <div>
    <SideBar/>
    </div>

    <div className="grid grid-cols-3 gap-y-2 gap-x-4 pl-24 pr-7 mt-8">
                {posts.length > 0  ? (
                  posts.map((post,index) => (
                    
              <div className="w-full">
                    <Post
                      key={post.id}
                      PostId={post.id}
                      PostImages={post.photos}
                      PostDate={post.publicationDate}
                      PostUsername={post.userInfos.fullName ? post.userInfos.fullName : " " }
                      userImageUrl={post.userInfos.image}
                      PostDomains={post.domains}
                      PostTitle={post.title}
                      PostDescription={post.description}
                      City={post.city}
                      Type={post.type}
                      UserId={post.userInfos.id}
                      Bookmarked={post.bookmarked}
                      >
                      </Post> 
                    
              </div>
                  ))
                ) :  (
                  <>no posts available</>
                )}
                
              {isLoading && <div>Loading....</div>}
        </div>

    </div>
  )
}
