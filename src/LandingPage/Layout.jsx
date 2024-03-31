import React from 'react';
import { NavBar } from "../NavBars/Nav";
import { useNavigate } from 'react-router-dom';

export default function Layout() {
    const navigate = useNavigate();

    const SingleImage = ({ imgSrc }) => {
        return (
          <>
              <img src={imgSrc} alt="brand image" className="h-fit w-full" />
            
          </>
        );
      };

  return (
   

<div>
  <NavBar/>

  <main class="p-4">
    <div class="mb-6">
    <div className="relative bg-white  pt-[20px] ">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-6/12">
              <div className="hero-content">
                <h1 className="pb-3  font-bold !leading-[1.208] text-dark xl:text-5xl">
                ENSAF Connect: Exclusive Job and Internship Opportunities
                </h1>
                <p className=" pl-4 max-w-[480px] pb-9 text-base text-body-color dark:text-dark-6">
                Welcome to ENSAF Connect, your exclusive gateway to 
                career opportunities within our school community.
                Say goodbye to scattered job searches and hello 
                 to tailored opportunities at your fingertips.
                </p>
                <ul className="flex flex-wrap items-center">
                  <li>
                    <div
                    onClick={()=>{navigate("/signup")}}
                      className="cursor-pointer inline-flex  items-center justify-center rounded-md bg-blue-600 px-6 py-2 text-center text-base font-medium text-white hover:bg-blue-800 lg:px-7"
                    >
                      Sign Up
                    </div>
                  </li>
                  <li>
                    <div
                      className="inline-flex items-center justify-center px-2 py-3 text-center text-base font-medium text-[#464646] hover:text-primary "
                    >
                      <span className="mr-2">
                      </span>
                      Already have an account ?  <span className='px-1 underline cursor-pointer text-blue-500 hover:text-blue-800' onClick={()=>{navigate("/login")}}>log in</span>
                    </div>
                  </li>
                </ul>
                <div className="clients pt-7">
                  <h6 className=" pb-1 flex items-center text-xs font-normal text-body-color ">
                    University:
                    <span className="ml-3 inline-block h-px w-8 bg-body-color"></span>
                  </h6>

                  <div className="flex items-center space-x-10">
                    <SingleImage
                      imgSrc={"/ensaf.jpg"}
                    />

                    <SingleImage
                      imgSrc={"/usmba.png"}
                    />

                    <SingleImage
                      imgSrc={"/minister.jpg"}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="lg:ml-auto lg:text-right">
                <div className="relative z-10 inline-block pt-11 lg:pt-0">
                  <img
                    src="https://cdn.tailgrids.com/1.0/assets/images/hero/hero-image-01.png"
                    alt="hero"
                    className="max-w-full lg:ml-auto"
                  />
                  <span className="absolute -bottom-8 -left-8 z-[-1]">
                    <svg
                      width="93"
                      height="93"
                      viewBox="0 0 93 93"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="90.5" r="2.5" fill="#3056D3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>


  )
}
