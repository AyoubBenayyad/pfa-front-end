import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocalState } from "../Util/useLocalStorage";

export default function Register() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [jwt, setJwt] = useLocalState("", "token");
  const [showError, setShowError] = useState(false);
  const [showSucess, setShowSucess] = useState(false);

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
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  function sendLoginRequest() {
    if (
      user.firstname === "" ||
      user.lastname === "" ||
      !EmailValidation(user.email) ||
      user.password === ""
    ) {
      setError("Invalid Inputs");
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      };
      fetch("http://localhost:8080/api/v1/auth/register", requestOptions)
        .then((response) => {
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
          setJwt(token.token);
        })
        .catch((err) => {
          console.log(typeof err);
          console.log(typeof err.message);
          setError(err.message);
        });
    }
  }
  return (
    <Container className="mt-5">
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
        <Col md="6" lg="8">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              placeholder="Enter First Name"
              value={user.firstname ? user.firstname : ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col md="6" lg="8">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              placeholder="Enter Last Name"
              value={user.lastname ? user.lastname : ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col md="6" lg="8">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              value={user.email ? user.email : ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col md="6" lg="8">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={user.password ? user.password : ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="d-flex justify-content-center">
        <Col md="6" lg="8">
          <Button
            variant="primary"
            type="submit"
            onClick={() => sendLoginRequest()}>
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
