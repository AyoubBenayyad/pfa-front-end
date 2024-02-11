import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

export default function EditProfile({
  showModal,
  setShowModal,
  userDetails,
  setUserDetails,
}) {
  const [user, setUser] = useState(userDetails);
  const [errors, setErrors] = useState({});
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
  useEffect(() => {
    setUser(userDetails);
  }, [userDetails]);
  const validate = () => {
    let errors = {};

    if (!EmailValidation(user.email)) errors.email = "Email format isnt Valid";
    if (user.password === "") errors.password = "Password is Required";
    if (user.email === "") {
      errors.email = "Email is Required";
    }

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
    if (user.adress === "") {
      errors.adress = "adress is Required";
    }
    if (user.bio === "") {
      errors.bio = "biographie is Required";
    }

    if (user.filiere === "") {
      errors.filiere = "branch is required";
    }
    if (user.niveau === "") {
      errors.niveau = "Year is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      setUserDetails(user);
      setShowModal(false);
    }
  };
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Modal
      show={showModal}
      onHide={() => {
        if (validate()) {
          setShowModal(false);
          setUser(userDetails);
        }
      }}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          <Col md="6" lg="8">
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
        </Row>
        <Row className="d-flex justify-content-center">
          <>
            <Col md="4">
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
            <Col md="4">
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  name="adress"
                  placeholder="Adress"
                  value={user.adress ? user.adress : ""}
                  isInvalid={!!errors.adress}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.adress}
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
                name="bio"
                placeholder="biography"
                isInvalid={!!errors.bio}
                value={user.bio ? user.bio : ""}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                {errors.bio}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col md="4">
            <Form.Group className="mb-3" controlId="formBranch">
              <Form.Label>Year</Form.Label>
              <Form.Select
                aria-label="Select niveau"
                name="niveau"
                onChange={handleChange}
                isInvalid={!!errors.niveau}
                value={user.niveau}>
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
                value={user.filiere}>
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
        <Button variant="primary" type="button" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Body>
    </Modal>
  );
}
