import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import fetchService from "../Services/fetchService";

export default function Follower({ jwt, name, id, image }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [removed, setRemoved] = useState(false);
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

  const removeFollower = (id) => {
    fetchService(
      `http://localhost:8080/api/v1/removeFollower/${id}`,
      jwt,
      "POST"
    )
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    setRemoved(true);
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
          {!removed ? (
            <Button variant="success" onClick={() => removeFollower(id)}>
              remove
            </Button>
          ) : (
            <Button variant="danger" disabled>
              removed
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}
