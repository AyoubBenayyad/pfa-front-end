import { NavBar } from "../NavBars/Nav";
import SideBar from "../NavBars/Side"
import React,{useState,useEffect,useRef} from "react";
import { Alert,  Col, Row,Button } from "react-bootstrap";
import { useLocalState } from "../Util/useLocalStorage";
import fetchService from "../Services/fetchService";
import Post from "../UserProfile/Post";
import { useNavigate } from "react-router-dom";

export default function Hpage(){
  
    const navigate = useNavigate();
    const [jwt,setJwt] = useLocalState("","token");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [question,setQuestion] = useState({
        title:"",
        description:""
    });
    const [profils,setProfils] = useState([]);
    //posts:
    const firstUpdate = useRef(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [posts,setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const [follow, setfollow] = useState(false);
    const [loadingFollow,setLoadingFollow] = useState(false);
    //follow logic:
    async function followRequest(id) {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/follow/${id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setTimeout(() => {
          setLoadingFollow(false);
          setfollow(!follow);
        }, 1500);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }

  
    const followUser = (id) => {
          
      setLoadingFollow(true);
      setProfils([]);
      followRequest(id);
    };
    //filter logic--------------------------------------------------------------------------------------
    const [filter,setFilter] = useState({
      domain:"All Domains",
      city:"All cities",
      type:"All",
      date:""
  });
  

  //fetch only when filter changes
  useEffect(()=>{
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    fetchData();
   },[filter])
   

//fetching data by page function:
const fetchData = async () => {
if(hasMore){
  if (isLoading) return;

  setIsLoading(true);

  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        domain: filter.domain,
        city: filter.city,
        type: filter.type,
        date: filter.date,
        page: page
      }),
    };

    const response = await fetch("http://localhost:8080/api/v1/filter", requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
    
      if (page === 0) {
        setPosts(data);
      } else {
        setPosts(prevPosts => [...prevPosts, ...data]);
      }
      if (data.length === 0) {
      setHasMore(false);
    }
  } catch (error) {
  }
  setPage(prevIndex => prevIndex + 1);
  setIsLoading(false);
}
};

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight -20 && posts.length > 0) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData]);


    const filterChange = (e) => {
      setPage(0);
      setHasMore(true);
      setFilter({
        ...filter,
        [e.target.name]: e.target.value,
      });
      
    }
  
    const options = [
      "All Domains",
      "Informatique",
      "Reseau et Telecom",
      "Macanique",
      "Dev Mobile",
      "Industrie",
      "Systemes embarques",
      "Genie Energitique",
      "Cyber Security",
      "DataScience et Analytics",
      "Systeme d'informations",
      "NetworkSecurity",
      "Devops",
      "Buisness Intelligence",
      "Routing",
      "Secops",
      "ERP",
      "Bloc chain"
    ];
  
    const cities = [
      "All cities",
      "Casablanca",
      "Fes",
      "Rabat",
      "Tanger",
      "Meknes",
      "Tetouan"
    ];
  
    const dates = [
        "Date-Default",
        "Date-Latest",
        "Date-Earliest"
    ];

//filter logic above--------------------------------------------------------------------------------------
   

//Interesting profils logic---------------------------------------
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await fetchService("http://localhost:8080/api/v1/InterestingProfils", jwt, "GET");
            setProfils(data);
          } catch (err) {
          }
        };
      
        fetchData();
      }, [follow]);

      useEffect(() => {
        profils.forEach((profil) => {
                const requestOptions = {
                    method: "GET",
                    headers: {
                    "Content-Type": "image/png",
                    Authorization: `Bearer ${jwt}`,
                    },
                };
                fetch(`http://localhost:8080/images/${profil.imageUrl}`, requestOptions)
                .then((response) => response.blob())
                .then((blob) => {

                  const updatedTableData = profils.map(element =>
                    element.imageUrl === profil.imageUrl ? { ...element, imageUrl: URL.createObjectURL(blob) } : element
                  );
                      setProfils(updatedTableData);
                })
                .catch((error) => {
                console.error("Error fetching image:", error);
                });
        });
      }, [profils]);
//---------------------------------------------------------------------------


//Question logic--------------------------------------------------------------
    useEffect(() => {
        if (error) {
          setShowError(true);
          const timer = setTimeout(() => {
            setShowError(false);
            setError("");
          }, 2000);
      
          return () => clearTimeout(timer);
        }
      }, [error]);

    function sendQuestion(){
        if(question.title==="" || question.description===""){
            setError("All the fields are required.");
        }else{
            const requestOptions = {
                method: "POST",
                headers: { 
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${jwt}`,
              },
                body: JSON.stringify(question),
              };
              fetch("http://localhost:8080/api/v1/question", requestOptions)
            .then((response) => {
              if (! response.ok) {
                return response.text().then((text) => {
                throw new Error(text);
              });
              }
            })
            .then(() => {
                question.title="";
                question.description="";
              setShowSucess(true);
              setShowError(false);
              setTimeout(() => setShowSucess(false), 2000);
            })
            .catch((err) => {
              setError(err.message);
            });
        }
    }
//-------------------------------------------------------------------------------------

    return(
<div className="bg-gray-200 min-h-screen bg-cover bg-no-repeat bg-fixed bg-center flex flex-col">
    
    <NavBar/>
    <div>
    <SideBar/>
    </div>
    <>
          <header  className="p-4 dark:bg-gray-200 dark:text-gray-100  z-9 top-6 ml-16 ">
          <div className="container flex flex-wrap h-2 mb-4">
          <div class="w-1/4 mb-4 px-2">
              <select
                name='domain'
                className="w-full rounded-lg border-gray-200  p-2 bg-white shadow-sm text-black"
                value={filter.domain}
                onChange={filterChange}
              >
                {options.map((option, index) => (
                  <option key={index} value={option} className={index===0 ? "text-slate-800" : ""} >{option}</option>
                ))}
              </select>
          </div>

                <div class="w-1/4 mb-4 px-2">
                <select
                name='city'
                className="w-full rounded-lg border-gray-200  p-2 bg-white shadow-sm text-black"
                value={filter.city}
                onChange={filterChange}
              >
                {cities.map((option,index)=>(
                    <option key={index} value={option} className={index===0 ? "text-slate-800" : ""} >
                      {option}
                    </option>
                ))}
              </select>
                </div>

                <div class="w-1/4 mb-4 px-2">
                <select
                name='type'
                className="w-full rounded-lg border-gray-200  p-2 bg-white shadow-sm text-black"
                value={filter.type}
                onChange={filterChange}
              >
                <option value="All"  className="text-slate-800">
                  All Offer type
                </option>
                <option value="Internship">Internship</option>
                <option value="Job">Job</option>
              </select>
                </div>
                <div class="w-1/4 mb-4 px-2">
                <select
                  name='date'
                  className="w-full rounded-lg border-gray-200  p-2 bg-white shadow-sm text-black"
                  value={filter.date}
                  onChange={filterChange}
              >
                  {dates.map((opt,index)=>(
                    <option key={index} value={opt} className={index===0 ? "text-slate-800" : ""}>
                      {opt}
                    </option>
                  ))}
              </select>
            </div>
          </div>

        </header>
    </>
    


  



    <div className=" flex-1 flex flex-col  w-2/4 ml-44 mt-8">
              <div className="flex flex-col gap-4">
                {posts.length > 0  ? (
                  posts.map((post,index) => (
                    
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
                      >
                      </Post> 
                    
                  ))
                ) :  (
                  <>no posts available</>
                )}
                
              </div>
              {isLoading && <div>Loading....</div>}
        </div>


    <div className="fixed mt-8  right-8 top-32 rounded  w-1/3  ">
        <div className="shadow-md  rounded">
                        <div className="mt-0 bg-gray-300 h-10 pl-4 pt-2 text-sky-700 text-l rounded-sm ">
                            Quick question
                        </div>

                        <div className="bg-white px-2 pt-2 pb-2 rounded">
                            {showError && (
                            <Row className="d-flex justify-content-center">
                            <Col md="6" lg="9">
                                <Alert className="text-center p-1" variant="danger">
                                {error}
                                </Alert>
                            </Col>
                            </Row>
                        )}
                        {showSucess && (
                            <Row className="d-flex justify-content-center">
                            <Col md="6" lg="9">
                                <Alert className="text-center p-1" variant="success">
                                posted successfully
                                </Alert>
                            </Col>
                            </Row>
                        )}
                                
                    
                                <input className=" mb-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="title" 
                                type="text" 
                                placeholder="Title" 
                                value={question.title ? question.title : ""} 
                                onChange={(event) => setQuestion((prev)=>({
                                    ...prev,
                                    title: event.target.value
                                }))}
                                />
                                <textarea
                                className="peer mb-1 h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder="Description"
                                value={question.description ? question.description : ""}
                                onChange={(event) => setQuestion((prev)=>({
                                    ...prev,
                                    description: event.target.value
                                }))}
                            ></textarea>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={sendQuestion}>
                                    Share
                                </button>
                        
                            </div>
        </div>

        <div className="mt-4 shadow-md  rounded">
            <div className="mt-0 bg-gray-300 h-10 pl-4 pt-2 text-sky-700 text-l rounded-sm ">
                        Interesting profils
                    </div>
                    
                    <div className="bg-white px-2 pt-2 pb-2 rounded">

                    {!loadingFollow && profils.map((profil, index) => (
                            <div className="flex items-center ml-4 gap-10" key={profil.id}>
                                <img
                                alt=""
                                className="w-10 h-10 cursor-pointer border rounded-full dark:bg-gray-500 dark:border-gray-700"
                                src={profil.imageUrl}
                                onClick={()=>{navigate(`/UsersProfile/${profil.id}`)}}
                                />
                                <div className="ml-2">
                                  <h3 className="text-lg -mb-1">{profil.fullName}</h3>
                                  <h5 className="text-sm pl-1 ">{profil.email}</h5>
                                </div>
                                <div className="flex">
                                      <p className="ms-0 text-sm font-medium text-gray-700 ">
                                        {profil.rating}
                                      </p>
                                      <svg
                                        className="w-4 h-4 text-amber-500 me-1 pt-1"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                      </svg>
                                </div>
                                <div  className="fixed right-24 ml-32 max-w-14">
                                <Button variant="primary" onClick={() => followUser(profil.id)}>
                                          Follow
                                        </Button>
                                      
                                    
                                </div>
                            </div>
                        ))}
                        {loadingFollow && (<>
                        <div class="py-2 rounded shadow-md   animate-pulse dark:bg-white">
                                <div class="flex p-1 space-x-4 max-h-9">
                                  <div class="flex-shrink-0 w-8 h-8 rounded-full dark:bg-gray-300"></div>
                                        <div class="flex-1 py-2 space-y-1">
                                          <div class="w-32 h-2 rounded dark:bg-gray-300"></div>
                                          <div class="w-44 h-2 rounded dark:bg-gray-300"></div>
                                        </div>
                                </div>
                              </div>
                              <div class="py-2 rounded shadow-md   animate-pulse dark:bg-white">
                                <div class="flex p-1 space-x-4 max-h-9">
                                  <div class="flex-shrink-0 w-8 h-8 rounded-full dark:bg-gray-300"></div>
                                    <div class="flex-1 py-2 space-y-1">
                                      <div class="w-32 h-2 rounded dark:bg-gray-300"></div>
                                      <div class="w-44 h-2 rounded dark:bg-gray-300"></div>
                                    </div>
                                </div>
                              </div>
                            <div class="py-2 rounded shadow-md   animate-pulse dark:bg-white">
                                <div class="flex p-1 space-x-4 max-h-9">
                                <div class="flex-shrink-0 w-8 h-8 rounded-full dark:bg-gray-300"></div>
                                  <div class="flex-1 py-2 space-y-1">
                                    <div class="w-32 h-2 rounded dark:bg-gray-300"></div>
                                    <div class="w-44 h-2 rounded dark:bg-gray-300"></div>
                                  </div>
                              </div>
                          </div>
                        </>)}
                    </div>
            </div>

           
        </div>
            
    </div>

    

    )
}