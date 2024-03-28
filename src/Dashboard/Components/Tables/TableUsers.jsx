import React,{useEffect, useState} from 'react'
import Pagination from '../Pagination'
import { useLocalState } from '../../../Util/useLocalStorage';
import fetchService from '../../../Services/fetchService';


export default function TableUsers() {
    const [jwt,setJwt] = useLocalState("","token");
    const [users,setUsers] = useState([]);
    const [images,setImages] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page) => setCurrentPage(page);
    const [maxPages,setMaxPages] = useState(1);
    const [isLoading,setisLoading] = useState(true);

    
    useEffect(()=>{
        fetchService("http://localhost:8080/api/v1/admin/maxTopUsers",jwt,"GET")
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
      
        fetch(`http://localhost:8080/api/v1/admin/Topusers/${currentPage - 1}`, requestOption1)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setUsers(data.reverse());
            const requestOptions = {
              method: "GET",
              headers: {
                "Content-Type": "image/png",
                Authorization: `Bearer ${jwt}`,
              },
            };
      
            const promises = data.map(async (user, index) => {
              try {
                const response = await fetch(`http://localhost:8080/images/${user.imageUrl}`, requestOptions);
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
    <h4 className='text-2xl text-gray-800  font-semibold pl-12 '>TOP RATED USERS</h4>
    <section className="container px-4 mx-auto">
    

    <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className=" bg-gray-800">
                            <tr>
                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-x-3">
                                        <span>User</span>
                                    </div>
                                </th>

                                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <button className="flex items-center gap-x-2">
                                        <span>Email Address</span>       
                                    </button>
                                </th>
                                <th scope="col" className="px-16 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Rating</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            {!isLoading ? users.map((user,index)=>(
                        <tr key={index}>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div className="inline-flex items-center gap-x-3">
                                        
                                        <div className="flex items-center gap-x-2">
                                            <img className="object-cover w-12 h-12 rounded-full" src={images[index]} alt=""/>
                                            <div>
                                                <h2 className="font-medium text-base dark:text-gray-800 pt-2 ">{user.fullName}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                
                                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{user.email}</td>

                                <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 `}>
                                     <h2 className={`text-sm font-normal text-black mt-1`}>{user.rating}</h2>
                                     <svg viewBox="0 0 24 24" width={20} height={18} fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.4834 16.7674C17.8471 16.9195 17.1829 17 16.5 17C11.8056 17 8 13.1944 8 8.50001C8 8.01653 8.04036 7.54249 8.11791 7.08105C8.08172 7.11586 8.04432 7.14792 8.00494 7.17781C7.72433 7.39083 7.37485 7.46991 6.67589 7.62806L6.03954 7.77204C3.57986 8.32856 2.35002 8.60682 2.05742 9.54774C1.76482 10.4887 2.60325 11.4691 4.2801 13.4299L4.71392 13.9372C5.19042 14.4944 5.42868 14.773 5.53586 15.1177C5.64305 15.4624 5.60703 15.8341 5.53498 16.5776L5.4694 17.2544C5.21588 19.8706 5.08912 21.1787 5.85515 21.7602C6.62117 22.3417 7.77267 21.8116 10.0757 20.7512L10.6715 20.4768C11.3259 20.1755 11.6531 20.0249 12 20.0249C12.3469 20.0249 12.6741 20.1755 13.3285 20.4768L13.9243 20.7512C16.2273 21.8116 17.3788 22.3417 18.1449 21.7602C18.9109 21.1787 18.7841 19.8706 18.5306 17.2544L18.4834 16.7674Z" fill="#1C274C"></path> <path opacity="0.5" d="M9.15302 5.40838L8.82532 5.99623C8.46538 6.64194 8.28541 6.96479 8.0048 7.17781C8.04418 7.14791 8.08158 7.11586 8.11777 7.08105C8.04022 7.54249 7.99986 8.01653 7.99986 8.50001C7.99986 13.1944 11.8054 17 16.4999 17C17.1828 17 17.8469 16.9195 18.4833 16.7674L18.4649 16.5776C18.3928 15.8341 18.3568 15.4624 18.464 15.1177C18.5712 14.773 18.8094 14.4944 19.2859 13.9372L19.7198 13.4299C21.3966 11.4691 22.235 10.4886 21.9424 9.54773C21.6498 8.60682 20.42 8.32856 17.9603 7.77203L17.324 7.62805C16.625 7.4699 16.2755 7.39083 15.9949 7.17781C15.7143 6.96479 15.5343 6.64194 15.1744 5.99624L14.8467 5.40837C13.58 3.13612 12.9467 2 11.9999 2C11.053 2 10.4197 3.13613 9.15302 5.40838Z" fill="#1C274C"></path> </g></svg>
                                    </div>
                                </td>
                            </tr>
                            )):(<>
                        <div className="animate-pulse inline-flex items-center p-2">
                            <div className="flex items-center ">
                                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
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
