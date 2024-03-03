import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocalState } from "../Util/useLocalStorage";
import useFile from "../Util/useFile";


export default function AddAnnonce() {const [error, setError] = useState("");
const [jwt, setJwt] = useLocalState("", "token");
const [showError, setShowError] = useState(false);
const [showSucess, setShowSucess] = useState(false);

const {selectedFiles,base64Files,handleFileChange,} = useFile();

const [annonce,setAnnonce] = useState({
    title: "",
    description: "",
    images: [],
    city:"",
    entreprise:"",
    type :"",
    domains:[]
});



  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (value) => {
    const updatedOptions = [...selectedOptions];

    if (updatedOptions.includes(value)) {
      updatedOptions.splice(updatedOptions.indexOf(value), 1);
    } else {
      updatedOptions.push(value);
    }

    setSelectedOptions(updatedOptions);
  };

  const checkboxOptions = [
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

function sendAnnonce(){
if(annonce.title === "" || annonce.description === "" ){
  setError("All the fields are required");
}else if(annonce.type === ""){
  setError("Select the offer type");
}else if(selectedOptions.length<1){
  setError("please select the domain.")
}
else{
  annonce.images = base64Files;
  annonce.domains = selectedOptions;
    const requestOptions = {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
    },
      body: JSON.stringify(annonce),
    };
    fetch("http://localhost:8080/api/v1/offre", requestOptions)
  .then((response) => {
    if (! response.ok) {
      return response.text().then((text) => {
      throw new Error(text);
    });
    }
  })
  .then((data) => {
    setShowSucess(true);
    setShowError(false);
    setTimeout(() => setShowSucess(false), 2000);
  })
  .catch((err) => {
    setError(err.message);
  });
}
}

  return (
<div class=" mx-auto w-auto px-4 py-16 sm:px-6 lg:px-8">
<div class="mx-auto max-w-3xl">
  <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Create a post</h1>

  <div className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
   
    <div>
      {showError && (
            <Row className="d-flex justify-content-center">
              <Col md="6" lg="6">
                <Alert className="text-center p-1" variant="danger">
                  {error}
                </Alert>
              </Col>
            </Row>
          )}
          {showSucess && (
            <Row className="d-flex justify-content-center">
              <Col md="6" lg="6">
                <Alert className="text-center p-1" variant="success">
                  posted successfully
                </Alert>
              </Col>
            </Row>
          )}
        <label for="title" class="sr-only">Title</label>
    </div>

    <div className="flex">
        <input
          type="text"
          className="w-6/12 rounded-lg border-gray-200 p-4 pe-12 text-slate-800 shadow-sm"
          placeholder="Enter Title"
          value={annonce.title ? annonce.title : ""}
          onChange={(event) => setAnnonce((prev)=>({
            ...prev,
            title:event.target.value
          }))}
        />

        <select
          id="type"
          className="w-6/12 rounded-lg border-gray-200 pe-12 ml-4 p-4 bg-white shadow-sm"
          value={annonce.type}
          onChange={(event) => setAnnonce((prev)=>({
            ...prev,
            type:event.target.value
          }))}
        >
          <option value="" disabled className="text-slate-800">
            Offer type
          </option>
          <option value="Internship">Internship</option>
          <option value="Job">Job</option>
        </select>
    </div>


    <div className="flex">
        <input
          type="text"
          className="w-6/12 rounded-lg border-gray-200 p-4 pe-12 text-slate-800 shadow-sm"
          placeholder="Entreprise name"
          value={annonce.entreprise ? annonce.entreprise : ""}
          onChange={(event) => setAnnonce((prev)=>({
            ...prev,
            entreprise:event.target.value
          }))}
        />

        <input
          type="text"
          className="w-6/12 rounded-lg border-gray-200 ml-4 p-4 pe-12 text-slate-800 shadow-sm "
          placeholder="City"
          value={annonce.city ? annonce.city : ""}
          onChange={(event) => setAnnonce((prev)=>({
            ...prev,
            city:event.target.value
          }))}
        />
    </div>
      

    <div>
      <label for="desc" class="sr-only">Description</label>

      <div class="relative">
          <textarea
              className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              value={annonce.description ? annonce.description : ""}
              onChange={(event) => setAnnonce((prev) => ({
                ...prev,
                description: event.target.value
              }))}
          ></textarea>

          <label
            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Description
          </label>
      </div>
    </div>
 
    <div className="flex flex-wrap space-x-4 space-y-2 ml-2">
      {checkboxOptions.map((option, index) => (
                    <div key={index} className=" text-slate-600">
                      <input
                        type="checkbox"
                        id={`checkbox${index}`}
                        className={index === 0 ? "size-4 rounded border-gray-300 mr-1 mt-2.5 ml-4" : "size-4 rounded border-gray-300 mr-1 mt-0"}
                        checked={selectedOptions.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                      />
                        {option}
                  </div>
              ))}

          
    </div>


    <div class=" mx-auto mb-3  sm:flex sm:space-y-0">
    <input
            type="file"
            className="form-control"
            id="fileInput"
            onChange={handleFileChange}
            multiple  
          />
    </div>


    
    <button
    
      type="submit"
      onClick={() => sendAnnonce()}
      class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
    >
      Post
    </button>


  </div>
</div>
</div>

  );
                }

