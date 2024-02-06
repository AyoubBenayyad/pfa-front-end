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
  });

  useEffect(() => {
    // Change the body color when the component mounts
    document.body.style.backgroundColor = "#8EC5FC";
    document.body.style.backgroundImage =
      "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)";

    // Reset the body color when the component unmounts
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);
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
    } else {
      console.log(errors);
    }
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}>
      <Container className="bg-light p-4 rounded shadow ">
        <Row className="d-flex justify-content-center mb-4">
          <Col md="8">
            {showProgressBar && (
              <ProgressBar now={(step / 3) * 100} /*variant="success"*/ />
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
            <Row className="d-flex justify-content-center">
              <Col md="8">
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFileChange}
                    isInvalid={!!errors.image}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.image}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
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
                  Submit
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
