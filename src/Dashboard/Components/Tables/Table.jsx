import React,{useEffect, useState} from 'react'
import Pagination from '../Pagination'
import { useLocalState } from '../../../Util/useLocalStorage';
import fetchService from '../../../Services/fetchService';
import Modal from './Modal';
import { jwtDecode } from 'jwt-decode';

export default function UsersTable() {

    const [isOpen, setIsOpen] = useState(false);

    const [jwt,setJwt] = useLocalState("","token");
    const [users,setUsers] = useState([]);
    const [images,setImages] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page) => setCurrentPage(page);
    const [maxPages,setMaxPages] = useState(1);
    const [isLoading,setisLoading] = useState(true);
    const[modal,setModal] = useState({});

    

    useEffect(()=>{
        fetchService("http://localhost:8080/api/v1/admin/maxUsers",jwt,"GET")
        .then((data)=>{
            setMaxPages(Math.floor((data/3)+1));
        }).catch((err)=>{
        });
    },[]);

    const triggerModal = (id,imageUrl,fullName,email,blocked)=>{
        setModal({
            id:id,
            imageUrl:imageUrl,
            fullName:fullName,
            email:email,
            blocked:blocked
        });
        setIsOpen(true);
    }

    useEffect(() => {
        const requestOption1 = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        };
      
        fetch(`http://localhost:8080/api/v1/admin/users/${currentPage - 1}`, requestOption1)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setUsers(data);
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
    <h4 className='text-2xl text-gray-800  font-semibold pl-12 '>USERS MANAGEMENT</h4>
    <section className="container px-4 mx-auto">
    <Modal 
                                isOpen={isOpen} 
                                setIsOpen={setIsOpen}  
                                setisLoading={setisLoading} 
                                id={modal.id} 
                                fullName={modal.fullName} 
                                email={modal.email}
                                imageUrl={modal.imageUrl}
                                blocked={modal.blocked}
                                jwt={jwt}
                                />

    <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-200 ">
                                    <div className="flex items-center gap-x-3">
                                        <span>Name</span>
                                    </div>
                                </th>

                                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-200">
                                    <button className="flex items-center gap-x-2">
                                        <span>Status</span>

                                        
                                    </button>
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-200">Email address</th>

                                
                                <th scope="col" className="relative py-3.5 px-4">
                                    <span className=" text-gray-200 text-sm font-normal ">BlackList</span>
                                </th>
                            </tr>
                        </thead>
                       
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            {!isLoading ? users.map((user,index)=>(
                                <>
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
                                <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${user.status ? "bg-emerald-100/60" : "bg-red-800"}`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${user.status ? "bg-emerald-500" : "bg-black"}`}></span>
                                        <h2 className={`text-sm font-normal ${user.status ? "text-emerald-500" : "text-black"}  mt-1`}>{user.status ? "enabled" : "disabled"}</h2>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">{user.email}</td>
                                
                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                    <div className="pl-5">
                                        <button onClick={()=>{triggerModal(user.id,images[index],user.email,user.fullName,user.status)}} className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                            {user.status ? (
                                            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>) 
: 
                                        (<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 3L21 21M17 10V8C17 5.23858 14.7614 3 12 3C11.0283 3 10.1213 3.27719 9.35386 3.75681M7.08383 7.08338C7.02878 7.38053 7 7.6869 7 8V10.0288M19.5614 19.5618C19.273 20.0348 18.8583 20.4201 18.362 20.673C17.7202 21 16.8802 21 15.2 21H8.8C7.11984 21 6.27976 21 5.63803 20.673C5.07354 20.3854 4.6146 19.9265 4.32698 19.362C4 18.7202 4 17.8802 4 16.2V14.8C4 13.1198 4 12.2798 4.32698 11.638C4.6146 11.0735 5.07354 10.6146 5.63803 10.327C5.99429 10.1455 6.41168 10.0647 7 10.0288M19.9998 14.4023C19.9978 12.9831 19.9731 12.227 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C17.773 10.0269 17.0169 10.0022 15.5977 10.0002M10 10H8.8C8.05259 10 7.47142 10 7 10.0288" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>)}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                                </>
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
