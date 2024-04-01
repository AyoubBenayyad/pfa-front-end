import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  ProgressBar,
  Row,
} from "react-bootstrap";
import useFileHandler from "../Util/useFileHandler";
import { NavBar } from "../NavBars/Nav";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const navigate = useNavigate();
  const { selectedFile, base64File, handleFileChange } = useFileHandler();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [showProgressBar, setShowProgressBar] = useState(true);

  const [showError, setShowError] = useState(false);
  const [showSucess, setShowSucess] = useState(false);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    cne: "",
    telephone: "",
    adresse: "",
    biographie: "",
    filiere: "",
    niveau: "",
    profileImg: "",
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

      // Clear the timeout if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [error]);
  
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  const validatePhoneNumber = (phoneNumber) => {
    // Define the pattern for a valid phone number
    const pattern = /(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/g;

    // Test the phone number against the pattern
    const isValid = pattern.test(phoneNumber);
    // Return the result
    return isValid;
  };

  const validate = () => {
    let errors = {};
    if (step === 1) {
      if (!EmailValidation(user.email))
        errors.email = "Email format isnt Valid";
      if (user.password === "") errors.password = "Password is Required";
      if (user.email === "") {
        errors.email = "Email is Required";
      }
      if (user.cne === "") {
        errors.cne = "cne is Required";
      }
      if (!validatePhoneNumber(user.telephone)) {
        errors.telephone = "Phone number format is Invalid";
      }
      if (user.telephone === "") {
        errors.telephone = "Phone number required";
      }
      if (user.adresse === "") {
        errors.adresse = "adresse is Required";
      }      
      if (base64File === "") {
        errors.image = "please choose a profile picture";
      }
    } else if (step === 2) {
      if (user.firstname === "") {
        errors.firstname = "firstname is Required";
      }
      if (user.lastname === "") {
        errors.lastname = "lastname is Required";
      }
      
      if (user.biographie === "") {
        errors.biographie = "biographie is Required";
      }
      if (user.filiere === "") {
        errors.filiere = "branch is required";
      }
      if (user.niveau === "") {
        errors.niveau = "Year is required";
      }

    } else if (step === 3) {
        if(selectedOptions.length < 1){
            setError ("Select At Least 1 Tag");
            errors.fields = "Select At Least 1 Tag";
          }
        }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setStep(step + 1);
    } else {
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const submitchanges = (e) => {
    if (validate()) {
      user.domains = selectedOptions;
      user.image = base64File;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      };
      fetch("http://localhost:8080/api/v1/auth/register", requestOptions)
        .then((response) => {
          setShowProgressBar(false);

          if (response.ok) {
            return response.json();
          } else {
            return response.text().then((text) => {
              // If it's not valid JSON, throw the text directly
              throw new Error(text);
            });
          }
        })
        .then((token) => {
          setShowSucess(true);
          setShowError(false);
          setTimeout(() => setShowSucess(false), 2000);
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        })
        .catch((err) => {
          setError(err.message);
        });
    } 
  };
    return (
        <>
        <NavBar/>
      <div className="absolute w-full h-4/5">
        <img
          src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
          className="absolute inset-0 object-cover w-full h-full"
          alt=""
        />
        <div className="relative h-full w-full bg-opacity-40 bg-slate-600">
          <svg
            className="absolute inset-x-0 bottom-0 text-white"
            viewBox="0 0 1160 162"
          >
            <path
              fill="currentColor"
              d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
            />
          </svg>
          <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-12">
            <div className="flex flex-col  items-center justify-between xl:flex-row">
              <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-5/12">
                <h2 className="max-w-full mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                ENSAF Connect helps you connect &  <br className="hidden md:block" />
                share with your collegues
                </h2>
                <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                  The first plateform 100% dedicated to ensaf student <br className="hidden md:block" />
                  Find exclusif jobs and internships.
                </p>
                <div
                  onClick={()=>{navigate("/")}}
                  className="inline-flex cursor-pointer items-center font-semibold tracking-wider transition-colors duration-200 text-slate-100 hover:text-teal-accent-700"
                >
                  Learn more
                  <svg
                    className="inline-block w-3 ml-2"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                  </svg>
                </div>
              </div>
              <div className="w-full   xl:w-6/12">
                <div className="bg-white rounded shadow-2xl  py-5">
                  <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                    Create Your Account
                  </h3>
                        <div>
                            <Row className="d-flex justify-content-center mb-4">
                                <Col md="8">
                                    {showProgressBar && (
                                    <ProgressBar now={(step / 3) * 100} /*variant="success"*/ />
                                    )}
                                </Col>
                            </Row>
                            {step === 1 && (
                                <>
                                <Row className="d-flex justify-content-center">
                                    <Col md="10" lg="10">
                                    <Form.Group className="mb-3" controlId="Step1">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter Email"
                                        value={user.email ? user.email : ""}
                                        isInvalid={!!errors.email}
                                        onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={user.password ? user.password : ""}
                                        isInvalid={!!errors.password}
                                        onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-center">
                                    <>
                                        <Col md="3">
                                        <Form.Group className="mb-4" controlId="step3">
                                            <Form.Label>CNE</Form.Label>
                                            <Form.Control
                                            type="text"
                                            name="cne"
                                            placeholder="CNE"
                                            value={user.cne ? user.cne : ""}
                                            isInvalid={!!errors.cne}
                                            onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                            {errors.cne}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        </Col>
                                        <Col md="4">
                                        <Form.Group className="mb-4" controlId="formBasicEmail">
                                            <Form.Label>telephone</Form.Label>
                                            <Form.Control
                                            type="text"
                                            name="telephone"
                                            placeholder="Telephone"
                                            value={user.telephone ? user.telephone : ""}
                                            isInvalid={!!errors.telephone}
                                            onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                            {errors.telephone}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        </Col>
                                        <Col md="3">
                                        <Form.Group className="mb-4" controlId="formBasicEmail">
                                            <Form.Label>Adresse</Form.Label>
                                            <Form.Control
                                            type="text"
                                            name="adresse"
                                            placeholder="Adresse"
                                            value={user.adresse ? user.adresse : ""}
                                            isInvalid={!!errors.adresse}
                                            onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                            {errors.adresse}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        </Col>
                                    </>
                                    </Row>
                                    <Row className="d-flex justify-content-center">
                                        <Col md="10">
                                            <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Change profile image</Form.Label>
                                            <Form.Control
                                                isInvalid={!!errors.image}
                                                type="file"
                                                onChange={handleFileChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                            {errors.image}
                                            </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </>
                                )}
                            {step === 2 && (
                                <>
                                    <Row className="d-flex justify-content-center">
                                    <>
                                        <Col md="5">
                                        <Form.Group className="mb-4" controlId="formBasicEmail">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                            type="text"
                                            name="firstname"
                                            placeholder="Enter First Name"
                                            value={user.firstname ? user.firstname : ""}
                                            isInvalid={!!errors.firstname}
                                            onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                            {errors.firstname}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        </Col>
                                        <Col md="5">
                                        <Form.Group className="mb-4" controlId="formBasicEmail">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                            type="text"
                                            name="lastname"
                                            placeholder="Enter Last Name"
                                            value={user.lastname ? user.lastname : ""}
                                            isInvalid={!!errors.lastname}
                                            onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                            {errors.lastname}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        </Col>
                                        </>
                                        </Row>
                                        <Row className="d-flex justify-content-center">
                                    <Col md="5">
                                        <Form.Group className="mb-3" controlId="formBranch">
                                        <Form.Label>Year</Form.Label>
                                        <Form.Select
                                            aria-label="Select Branch"
                                            name="niveau"
                                            onChange={handleChange}
                                            isInvalid={!!errors.niveau}
                                            defaultValue="">
                                            <option value="">-- choose your year -- </option>
                                            <option value="FirstYear">First year</option>
                                            <option value="SecondYear">Second year</option>
                                            <option value="ThirdYear">Last year</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.niveau}
                                        </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md="5">
                                        <Form.Group className="mb-3" controlId="formBranch">
                                        <Form.Label>branch</Form.Label>
                                        <Form.Select
                                            aria-label="Select Branch"
                                            name="filiere"
                                            onChange={handleChange}
                                            isInvalid={!!errors.filiere}
                                            defaultValue="">
                                            <option value="">-- choose your branch -- </option>
                                            <option value="INFO">INFO</option>
                                            <option value="INDUS">INDUS</option>
                                            <option value="GTR">GTR</option>
                                            <option value="MSA">MSA</option>
                                            <option value="GESI">GESI</option>
                                            <option value="SEII">SEII</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.filiere}
                                        </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    </Row>
                                    <Row className="d-flex justify-content-center">
                                    <Col md="10">
                                        <Form.Group className="mb-3" controlId="Biographie">
                                        <Form.Label>Biography</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="biographie"
                                            placeholder="biography"
                                            isInvalid={!!errors.biographie}
                                            value={user.biographie ? user.biographie : ""}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.biographie}
                                        </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    </Row>
                                </>
                            )}
                                    {step === 3 && (
                                    <>
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
                                                Sign up succeful
                                            </Alert>
                                            </Col>
                                        </Row>
                                        )}
                                            <p className="ml-2 mb-4">Finalize your registration by choosing areas of interest. 
                                        This will help us provide you with offers that may interest you.</p>
                                        <div className="ml-2 mb-4 flex flex-wrap justify-start space-x-2">
                                            {checkboxOptions.map((option, index) => (
                                            <div key={index} className="flex items-center mb-2" style={{ width: '16?6%' }}>
                                                <input
                                                type="checkbox"
                                                id={`checkbox${index}`}
                                                className="hidden"
                                                checked={selectedOptions.includes(option)}
                                                onChange={() => handleCheckboxChange(option)}
                                                />
                                                <label
                                                htmlFor={`checkbox${index}`}
                                                className={`px-4 py-2 rounded-full cursor-pointer transition duration-300 ${
                                                    selectedOptions.includes(option) ? 'bg-blue-500 text-white' : 'bg-gray-300 text-zinc-800'
                                                }`}
                                                >
                                                {option}
                                            </label>
                                            </div>
                                            ))}
                                            </div>

                                                
                                        </>
                                        )}
                            <Row className="d-flex justify-content-center">
                                <Col md="6" lg="8">
                                    <div className="d-flex justify-content-between">
                                    {step > 1 && (
                                        <Button variant="secondary" onClick={handlePrevious}>
                                        Previous
                                        </Button>
                                    )}
                                    {step < 3 ? (
                                        <Button variant="primary" onClick={handleNext}>
                                        Next
                                        </Button>
                                    ) : (
                                        <Button variant="success" type="submit" onClick={submitchanges}>
                                        SignUp
                                        </Button>
                                    )}
                                    </div>
                                </Col>
                            </Row>

                        </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </>
    );
  };