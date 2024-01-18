import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocalState } from "../Util/useLocalStorage";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
  function sendLoginRequest() {
    if (username === "" || password === "") {
      setError("Please Enter All Fields");
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      };
      fetch("http://localhost:8080/api/v1/auth/authenticate", requestOptions)
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
              Login succeful
            </Alert>
          </Col>
        </Row>
      )}
      <Row className="d-flex justify-content-center">
        <Col md="6" lg="8">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={username ? username : ""}
              onChange={(event) => setUsername(event.target.value)}
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
              placeholder="Password"
              value={password ? password : ""}
              onChange={(event) => setPassword(event.target.value)}
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