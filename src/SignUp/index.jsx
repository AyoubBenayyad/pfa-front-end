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

export default function SignUp() {
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
    } else if (step === 2) {
      if (user.firstname === "") {
        errors.firstname = "firstname is Required";
      }
      if (user.lastname === "") {
        errors.lastname = "lastname is Required";
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
      if (user.biographie === "") {
        errors.biographie = "biographie is Required";
      }
    } else if (step === 3) {
      if (user.filiere === "") {
        errors.filiere = "branch is required";
      }
      if (user.niveau === "") {
        errors.niveau = "Year is required";
      }
      if (base64File === "") {
        errors.image = "please choose a profile picture";
      }
    }else if(step === 4){
      if(selectedOptions.length < 3){
        setError ("please select at least 3 tags");
        errors.fields = "select atleast 3 tags";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setStep(step + 1);
    } else {
      console.log(errors);
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
              console.log(text);
              throw new Error(text);
            });
          }
        })
        .then((token) => {
          setShowSucess(true);
          setShowError(false);
          setTimeout(() => setShowSucess(false), 2000);
          console.log(token);
        })
        .catch((err) => {
          console.log(typeof err);
          console.log(typeof err.message);
          setError(err.message);
        });
    } 
  };
  return (

    <>
    <NavBar/>
    <div
      className="d-flex bg-slate-300  justify-content-center align-items-center"
      style={{ height: "100vh" }}>
      <Container className="bg-light p-4 rounded shadow  ">
        <Row className="d-flex justify-content-center mb-4">
          <Col md="8">
            {showProgressBar && (
              <ProgressBar now={(step / 4) * 100} /*variant="success"*/ />
            )}
          </Col>
        </Row>
        {step === 1 && (
          <Row className="d-flex justify-content-center">
            <Col md="6" lg="8">
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
        )}
        {step === 2 && (
          <>
            <Row className="d-flex justify-content-center">
              <>
                <Col md="4">
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
                <Col md="4">
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
              <>
                <Col md="2">
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
                <Col md="3">
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
              <Col md="8">
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
            <Row className="d-flex justify-content-center">
              <Col md="4">
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
              <Col md="4">
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

            
          </>
        )}
        

        {step === 4 && (
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
                <p className="ml-52 mb-4">Finalize your registration by choosing areas of interest. 
            This will help us provide you with offers and ads that may interest you.</p>
            <div className="ml-48 mb-4 flex flex-wrap justify-start">
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
                  {step < 4 ? (
                    <Button variant="primary" onClick={handleNext}>
                      Next
                    </Button>
                  ) : (
                    <Button variant="success" type="submit" onClick={submitchanges}>
                      Submit
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
      </Container>
    </div>
    </>

  );
}
