import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import fetchService from "../Services/fetchService";
import Follower from "./Follower";

export default function Followers({ jwt, handleFollowers }) {
  const [followers, setfollowers] = useState([]);

  useEffect(() => {
    fetchService("http://localhost:8080/api/v1/profile/followers", jwt, "GET")
      .then((data) => {
        setfollowers(data);
        handleFollowers(data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  return (
    <Row className="d-flex justify-content-center align-items-center mt-2 ">
      <Col
        md={10}
        className="general_info p-5"
        style={{
          borderRadius: "6px",
        }}>
        <Container>
          <Row className=" gap-1 justify-content-between">
            {followers.map((follower) => (
              <Col xs={5} key={follower.id} className="followerWrapper">
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
      </Col>
    </Row>
  );
}
