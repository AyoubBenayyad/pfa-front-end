import React,{useEffect, useState} from 'react'
import Pagination from '../Pagination'
import { useLocalState } from '../../../Util/useLocalStorage';
import fetchService from '../../../Services/fetchService';

export default function TablePosts() {
    const [jwt,setJwt] = useLocalState("","token");
    const [posts,setPosts] = useState([]);
    const [images,setImages] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page) => setCurrentPage(page);
    const [maxPages,setMaxPages] = useState(1);
    const [isLoading,setisLoading] = useState(true);

 
    useEffect(()=>{
        fetchService("http://localhost:8080/api/v1/admin/MaxPosts",jwt,"GET")
        .then((data)=>{
            setMaxPages(Math.floor((data/3)+1));
        }).catch((err)=>{
        });
    },[]);


    useEffect(() => {
        const requestOption1 = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        };
      
        fetch(`http://localhost:8080/api/v1/admin/TopPosts/${currentPage - 1}`, requestOption1)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setPosts(data);
            const requestOptions = {
              method: "GET",
              headers: {
                "Content-Type": "image/png",
                Authorization: `Bearer ${jwt}`,
              },
            };
      
            const promises = data.map(async (post, index) => {
              try {
                const response = await fetch(`http://localhost:8080/images/${post.user.imageUrl}`, requestOptions);
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                const blob = await response.blob();
                return URL.createObjectURL(blob);
              } catch (error) {
                console.error("Error fetching image:", error);
                return null;
              }
            });
      
            Promise.all(promises)
              .then((imageUrls) => {
                setImages(imageUrls);
                setisLoading(false);
              })
              .catch((error) => {
                console.error("Error fetching images:", error);
              });
          })
          .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
          });
      }, [currentPage,isLoading]);
      
  return (
    <>
    <h4 className='text-2xl text-gray-800  font-semibold pl-12 '>TOP RATED POSTS</h4>
    <section className="container px-4 mx-auto">
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" className="py-3.5 px-28 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-x-3">
                                        <span>Title</span>
                                    </div>
                                </th>

                                <th scope="col" className="px-32 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <button className="flex items-center gap-x-2">
                                        <span>User</span>

                                        
                                    </button>
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Interactions Rate</th>

                                
                                <th scope="col" className="relative py-3.5 px-4">
                                    <span className=" text-slate-300 text-sm font-normal ">Post type</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            {!isLoading ? posts.map((post,index)=>(
                        <tr key={index}>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 `}>
                                        <h2 className="font-medium text-base dark:text-gray-800 pt-2 ">{post.title}</h2>
                                    </div>
                                </td>
                                <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                        <div className="inline-flex items-center gap-x-3">
                                            
                                            <div className="flex items-center gap-x-2">
                                                <img className="object-cover w-12 h-12 rounded-full" src={images[index]} alt=""/>
                                                <div>
                                                    <h2 className="font-medium text-base dark:text-gray-800 pt-2 ">{post.user.fullName}</h2>
                                                    <h6>{post.user.email}</h6>
                                                </div>
                                            </div>
                                        </div>
                                </td>
                                <td className="px-16 py-4 text-xl   text-sky-950 font-semibold  whitespace-nowrap">{post.interactions}</td>
                                
                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                    <div className="pl-5">
                                    <h2 className="font-medium text-base dark:text-gray-800 pt-2 ">{post.type}</h2>
                                    </div>
                                </td>
                            </tr>
                            )):(<>
                        <div className="animate-pulse inline-flex items-center p-2">
                            <div className="flex items-center ">
                                <div className="w-60 h-12 bg-gray-300 pl-10"></div>
                                <div>
                                    <div className="w-60 h-4 bg-gray-300 rounded"></div>
                                    <div className="w-24 h-3 mt-1 bg-gray-300 rounded"></div>
                                </div>
                                <div className='w-60 h-4 bg-gray-300 rounded mb-1 ml-36'></div>
                            </div>
                        </div>
                            </>)}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <Pagination max={maxPages} currentPage={currentPage} onPageChange={onPageChange}></Pagination>
   
</section>
</>
  )
}
