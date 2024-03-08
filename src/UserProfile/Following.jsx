import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import fetchService from "../Services/fetchService";

export default function Following({ jwt, name, id, image }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [Unfollow, setUnfollow] = useState(false);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "image/png",
        Authorization: `Bearer ${jwt}`,
      },
    };
    fetch(`http://localhost:8080/images/${image}`, requestOptions)
      .then((response) => response.blob())
      .then((blob) => {
        setImageUrl(URL.createObjectURL(blob));
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, []);

  const unfollowUser = (id) => {
    fetchService(`http://localhost:8080/api/v1/unfollow/${id}`, jwt, "POST")
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    setUnfollow(true);
  };

  const followUser = (id) => {
    fetchService(`http://localhost:8080/api/v1/follow/${id}`, jwt, "POST")
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    setUnfollow(false);
  };
  // Follower Component
  return (
    <Container>
      <Row className="d-flex align-items-center">
        <Col md={8} className="d-flex align-items-center">
          <Col>
            <div
              style={{
                width: "100px",
                height: "100px",
                overflow: "hidden",
                borderRadius: "10px",
              }}>
              <Image
                src={imageUrl}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt={name}
              />
            </div>
          </Col>
          <Col
            className="d-flex flex-column align-items-start"
            style={{ marginLeft: "20px" }}>
            <p
              className="text-left m-0"
              style={{ fontWeight: "bold", marginBottom: "5px" }}>
              {name}
            </p>
            <p
              className="text-left m-0"
              style={{
                fontSize: " 13px",
                fontWeight: "600",
                color: "#b0b3b8",
              }}>
              33 mutual friends
            </p>
          </Col>
        </Col>

        <Col md={4} className="d-flex justify-content-end">
          {!Unfollow ? (
            <Button variant="secondary" onClick={() => unfollowUser(id)}>
              Following
            </Button>
          ) : (
            <Button variant="primary" onClick={() => followUser(id)}>
              Follow
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}
