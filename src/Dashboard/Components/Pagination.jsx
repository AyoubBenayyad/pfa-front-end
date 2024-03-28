import React,{useEffect, useState} from 'react'

export default function Pagination({max,currentPage,onPageChange}) {
    
  return (
    <div class="flex items-center justify-between mt-6 ml-20">
    <div  className={`flex items-center ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'} px-5 py-2 text-sm dark:text-gray-700 capitalize transition-colors duration-200 dark:bg-white border rounded-md gap-x-2 dark:hover:bg-gray-100`}
            onClick={()=>{if(currentPage!==1){onPageChange(currentPage-1)}}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>

        <span>
            previous
        </span>
    </div>

    <div class="items-center hidden lg:flex gap-x-3">
        {currentPage!==1 && (
            <div class="cursor-pointer underline px-2 py-1 text-sm dark:text-gray-500 rounded-md hover:bg-gray-100" onClick={()=>{onPageChange(1)}}>1</div>
        )}
       {currentPage>2 && (<>
            <div class="cursor-pointer underline px-2 py-1 text-sm dark:text-gray-500 rounded-md  hover:bg-gray-100">...</div>
            <div class="cursor-pointer underline px-2 py-1 text-sm dark:text-gray-500 rounded-md  hover:bg-gray-100" onClick={()=>{onPageChange(currentPage-1)}}>{currentPage-1}</div>
        </>
        )}

        <div class="cursor-pointer underline px-2 py-1 text-sm dark:text-blue-500 rounded-md  dark:bg-blue-100">{currentPage}</div>
        
        {currentPage<max-1 && (<>
        <div class="cursor-pointer underline px-2 py-1 text-sm dark:text-gray-500 rounded-md  hover:bg-gray-100" onClick={()=>{onPageChange(currentPage+1)}}>{currentPage+1}</div>
        <div class="cursor-pointer underline px-2 py-1 text-sm dark:text-gray-500 rounded-md  hover:bg-gray-100">...</div>
        </>)}

        {currentPage !==max && (<>
        <div class="cursor-pointer underline px-2 py-1 text-sm dark:text-gray-500 rounded-md  hover:bg-gray-100" onClick={()=>{onPageChange(max)}}>{max}</div>
        </>)}
        </div>

    <div className={`flex items-center  ${currentPage === max ? 'cursor-not-allowed' : 'cursor-pointer'} px-5 py-2 text-sm dark:text-gray-700 capitalize transition-colors duration-200 dark:bg-white border rounded-md gap-x-2 dark:hover:bg-gray-100`}
         onClick={()=>{if(currentPage!==max){onPageChange(currentPage+1)}}}>
        <span>
            Next
        </span>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
    </div>
    <div className="flex overflow-x-auto sm:justify-center">
     </div>
</div>
  )
}
