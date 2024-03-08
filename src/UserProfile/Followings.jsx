import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import fetchService from "../Services/fetchService";
import Follower from "./Follower";
import { Navigate } from "react-router-dom";
import Following from "./Following";

export default function Followings({ jwt }) {
  const [followings, setfollowings] = useState([]);
  const [showError, setShowError] = useState(false);

  const [isloading, setloading] = useState(true);
  useEffect(() => {
    fetchService("http://localhost:8080/api/v1/profile/following", jwt, "GET")
      .then((data) => {
        setfollowings(data);
        setloading(false);
      })
      .catch((err) => {
        setShowError(true);
      });
  }, []);
  // Follower List
  if (showError) {
    return (
      <Row className="d-flex justify-content-center align-items-center mt-2">
        <Col md="6" lg="6">
          <Alert className="text-center p-1" variant="danger">
            {"error while fetching followings"}
          </Alert>
        </Col>
      </Row>
    );
  }
  return (
    <>
      <Row className="d-flex justify-content-center align-items-center mt-2">
        <Col
          md={10}
          className="general_info p-3"
          style={{ borderRadius: "6px" }}>
          {isloading ? (
            <Spinner animation="grow" />
          ) : (
            <Container>
              <Row className="d-flex flex-wrap justify-content-start ps-4">
                {followings.map((follower) => (
                  <Col
                    xs={5}
                    key={follower.id}
                    className="followerWrapper mb-4 px-2 me-5 ms-4">
                    <Following
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
    </>
  );
}
