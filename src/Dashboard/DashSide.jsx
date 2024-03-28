import React,{useEffect, useState} from 'react';
import { useLocalState } from "../Util/useLocalStorage";
import fetchService from "../Services/fetchService";

export default function DashSide({activeNavItem,setActiveNavItem}) {
//side bar buttons :
    const handleNavItemClick = (index) => {
      setActiveNavItem(index);
    };
//Admin-User infos:
const [admin,setAdmin] = useState({
  fullName:"",
  email:"",
  imageUrl:""});

const [jwt,setJwt] = useLocalState("","token");

useEffect(()=>{
  fetchService("http://localhost:8080/api/v1/admin", jwt, "GET")
  .then((data) => {
    setAdmin(data);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "image/png",
        Authorization: `Bearer ${jwt}`,
      },
    };

    fetch(`http://localhost:8080/images/${data.imageUrl}`, requestOptions)
      .then((response) => response.blob())
      .then((blob) => {
        setAdmin(prev => ({ ...prev, imageUrl: URL.createObjectURL(blob) }));
      });
  })
  .catch((err) => {
  });
},[]);





  return (
<aside class="flex fixed flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-gray-400 border-r rtl:border-r-0 rtl:border-l dark:bg-slate-100 dark:border-gray-700">

    <div class="flex flex-col items-center mt-6 -mx-2">
        <img class="object-cover w-24 h-24 mx-2 rounded-full" src={admin.imageUrl ? admin.imageUrl : ""} alt="avatar"/>
        <h4 class="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-800">{admin.fullName ?admin.fullName : "" }</h4>
        <p class="mx-2  font-medium text-gray-400 dark:text-gray-400">{admin.email ? admin.email  : ""}</p>
         </div>
<hr></hr>
    <div class="flex flex-col justify-between flex-1 mt-6">
    <nav>
      <div
        className={`flex items-center px-4 py-2 ${
          activeNavItem === 0 ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-700'
        } rounded-lg   transition-colors duration-300 cursor-pointer`}
        onClick={() => handleNavItemClick(0)}
      >
      <span>Dashboard</span>
      </div>

      <div
        className={`flex items-center px-4 py-2 mt-5 ${
          activeNavItem === 1 ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-700'
        } rounded-lg  transition-colors duration-300 cursor-pointer`}
        onClick={() => handleNavItemClick(1)}
      >
      <span>Tables</span>
      </div>

      <div
        className={`flex items-center px-4 py-2 mt-5 ${
          activeNavItem === 2 ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-700'
        } rounded-lg  transition-colors duration-300 cursor-pointer`}
        onClick={() => handleNavItemClick(2)}
      >
      <span>Charts</span>
      </div>

      <div
        className={`flex items-center px-4 py-2 mt-5 ${
          activeNavItem === 3 ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-700'
        } rounded-lg  transition-colors duration-300 cursor-pointer`}
        onClick={() => handleNavItemClick(3)}
      >
        <span>Performances</span>
      </div>
    </nav>
    </div>
</aside>
  )
}
