import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";

export default function Follower({ jwt, name, id, image }) {
  const [imageUrl, setImageUrl] = useState(null);

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

  return (
    <Container>
      <Row className="d-flex align-items-center ">
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
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
              alt={name}
            />
          </div>
        </Col>
        <Col
          className="d-flex flex-column align-items-center"
          style={{ marginLeft: "-160px" }}>
          <p
            className="text-center m-0"
            style={{ fontWeight: "bold", marginBottom: "5px" }}>
            {name}
          </p>
          <p
            className="text-center m-0"
            style={{ fontSize: " 13px", fontWeight: "600", color: "#b0b3b8" }}>
            33 mutual friends
          </p>
        </Col>
      </Row>
    </Container>
  );
}
