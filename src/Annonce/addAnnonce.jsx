import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocalState } from "../Util/useLocalStorage";
import  {useFiles} from "../Util/useFile";


export default function AddAnnonce() {
      const [error, setError] = useState("");
      const [jwt, setJwt] = useLocalState("", "token");
      const [showError, setShowError] = useState(false);
      const [showSucess, setShowSucess] = useState(false);
      const {selectedFiles,base64Files,handleFileChange,} = useFiles();
      


      const [annonce,setAnnonce] = useState({
          Title: "",
          Description: "",
          images: [],
      });

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

    function sendAnnonce(){
      if(annonce.title == "" || annonce.description == ""){
        setError("All the fields are required");
      }else {
        annonce.images = base64Files;
          const requestOptions = {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
          },
            body: JSON.stringify(annonce),
          };
          fetch("http://localhost:8080/api/v1/annonce", requestOptions)
        .then((response) => {
          if (! response.ok) {
            return response.text().then((text) => {
            // If it's not valid JSON, throw the text directly
            throw new Error(text);
          });
          }
        })
        .then((data) => {
          // Handle the data from the response (e.g., update state or perform actions)
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
                  posted successfully
                </Alert>
              </Col>
            </Row>
          )}
          <Row className="d-flex justify-content-center">
            <Col md="6" lg="8">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={annonce.title ? annonce.title : ""}
                  onChange={(event) => setAnnonce((prev)=>({
                    ...prev,
                    title:event.target.value
                  }))}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="d-flex justify-content-center">
            <Col md="6" lg="8">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  value={annonce.description ? annonce.description  : ""}
                  onChange={(event) => setAnnonce((prev)=>({
                    ...prev,
                    description: event.target.value
                  }))}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mb-3">
            <label htmlFor="fileInput" className="form-label">
              Select Images:
            </label>
            <input
              type="file"
              className="form-control"
              id="fileInput"
              onChange={handleFileChange}
              multiple  
            />
          </div>

    <Row className="d-flex justify-content-center">
      <Col md="6" lg="8">
        <Button
          variant="primary"
          type="submit"
          onClick={() => sendAnnonce()}>
          Post
        </Button>
      </Col>
    </Row>
  </Container>
      );
                }

