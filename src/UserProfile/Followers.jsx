import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import fetchService from "../Services/fetchService";
import Follower from "./Follower";
import { Navigate } from "react-router-dom";

export default function Followers({ jwt, handleFollowers }) {
  const [showError, setShowError] = useState(false);
  const [isloading, setloading] = useState(true);
  const [followers, setfollowers] = useState([]);

  useEffect(() => {
    fetchService("http://localhost:8080/api/v1/profile/followers", jwt, "GET")
      .then((data) => {
        setfollowers(data);
        handleFollowers(data);
        setloading(false);
      })
      .catch((err) => {
        setShowError(true);
      });
  }, []);

  if (showError) {
    return (
      <Row className="d-flex justify-content-center align-items-center mt-2">
        <Col md="6" lg="6">
          <Alert className="text-center p-1" variant="danger">
            {"error while fetching followers"}
          </Alert>
        </Col>
      </Row>
    );
  }
  // Follower List
  return (
    <Row className="d-flex justify-content-center align-items-center mt-2">
      <Col md={10} className="general_info p-3" style={{ borderRadius: "6px" }}>
        {isloading ? (
          <Spinner animation="grow" />
        ) : (
          <Container>
            <Row className="d-flex flex-wrap justify-content-start ps-4">
              {followers.map((follower) => (
                <Col
                  xs={5}
                  key={follower.id}
                  className="followerWrapper mb-4 px-2 me-5 ms-4">
                  <Follower
                    jwt={jwt}
                    name={follower.name}
                    id={follower.id}
                    image={follower.image}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </Col>
    </Row>
  );
}
