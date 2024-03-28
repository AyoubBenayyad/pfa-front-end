import React, { useState } from 'react';


function Modal({isOpen,setIsOpen,setisLoading,id,fullName,email,imageUrl,jwt,blocked}) {
    const blacklist =(id)=>{
        async function fetchblackList() {
            setIsOpen(false);
            const requestOption1 = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            };
        
            try {
                const response = await fetch(`http://localhost:8080/api/v1/admin/block/${id}`, requestOption1);
                if (response.ok) {
                }
            } catch (err) {
            }
        
            setTimeout(() => {
            setisLoading(true);
            }, 1000);
        }
        
        fetchblackList();
        
    };

    return (
        <div className="">
            {isOpen && (
                <div
                    className="fixed inset-x-0 bottom-36 left-28 z-10 overflow-y-hidden backdrop-blur-sm"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="relative inline-block px-4  pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <div>
                                 <div className="mt-2 text-center">
                                    <h3 className={`text-2xl leading-6 font-semibold underline ${blocked ? "text-red-800" : "text-green-500"} capitalize " id="modal-title`}>{blocked ? "Block User:" : "Unblock User:"}</h3>
                                    <div className="inline-flex items-center gap-x-3 pt-7">
                                        <div className="flex items-center gap-x-2">
                                            <img className="object-cover w-12 h-12 rounded-full" src={imageUrl} alt=""/>
                                            <div>
                                                <h2 className="font-medium text-base dark:text-gray-800 pt-2 ">{fullName}</h2>
                                                <h5>{email}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 sm:flex sm:items-center sm:justify-between">
                                <div href="#" className="text-sm text-blue-500 hover:underline"></div>

                                <div className="sm:flex sm:items-center ">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2    hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                    onClick={()=>{blacklist(id)}}
                                        className={`w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform ${blocked ? "bg-red-500 hover:bg-red-800" : "bg-green-500 hover:bg-green-800"} rounded-md sm:w-auto sm:mt-0  focus:outline-none focus:ring focus:ring-opacity-40`}
                                    >
                                        {blocked ? "Block" : "Unblock"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Modal;
