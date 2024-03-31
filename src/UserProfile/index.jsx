import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button
} from "react-bootstrap";
import "../UserProfile/ProfileInfo.css";
import { NavBar } from "../NavBars/Nav";
import SideBar from "../NavBars/Side";
import { HiMiniIdentification } from "react-icons/hi2";
import {
  FaHeart,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";
import { MdEmail, MdFeed, MdPhone } from "react-icons/md";
import EditProfile from "./EditProfile";
import { useLocalState } from "../Util/useLocalStorage";
import fetchService from "../Services/fetchService";
import Followers from "./Followers";
import {  useNavigate } from "react-router-dom";
import Followings from "./Followings";
import ProfilePosts from "./ProfilePosts";
import { Rating } from "@material-tailwind/react";
import UserContext from "../context/UserContext";
function ProfilePage() {
  const navigate = useNavigate();
  const [jwt, setJwt] = useLocalState("", "token");
  const [imageUrl, setImageUrl] = useState(null);

  const [imageUrl2, setImageUrl2] = useState(null);
  const [activeDiv, setActiveDiv] = useState("Posts");
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState({});
  const [followers, setFollowers] = useState([]);
  const { user: LoggedUser } = useContext(UserContext);
  const userData = {
    email: "ayoub@gmail.com",
    firstname: "ayoub",
    lastname: "benayyad",
    telephone: "0621838896",
    bio: "hello im ayoub, a software engineering student at ensa fes",
    adress: "Fes Maroc",
    cne: "N130090844",
    filiere: "INFO",
    niveau: "FirstYear",
    followersNumber: 100,
  };

  const [user, setUser] = useState(userData);
  useEffect(() => {
    fetchService("http://localhost:8080/api/v1/profile", jwt, "GET")
      .then((data) => {
        setUser(data);
        setImageUrl2(data.image);
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "image/png",
            Authorization: `Bearer ${jwt}`,
          },
        };

        fetch(`http://localhost:8080/images/${data.image}`, requestOptions)
          .then((response) => response.blob())
          .then((blob) => {
            setImageUrl(URL.createObjectURL(blob));
          });
      })
      .catch((err) => {
        navigate("/login");
        console.log(err);
      });

    fetchService(
      `http://localhost:8080/api/v1/getUserRate/${LoggedUser.id}`,
      jwt,
      "GET"
    )
      .then((data) => {
        setRating(data);
      })
      .catch((err) => {
      });
    
  }, []);

  return (
    <div className="bg-slate-300">
      <NavBar />
      <SideBar />
      <Container>
        <Row className="d-flex justify-content-center align-items-center mt-5">
          <Col md={10} style={{ padding: "0px" }}>
            <Card>
              <div className="profile-card">
                <Card.Img
                  variant="top"
                  src={"/background.jpg"}
                  className="card-background"
                />
                <Card.Img
                  variant="top"
                  src={imageUrl}
                  className="rounded-circle profile-pic"
                />
              </div>

              <div>
                <div className="general_info p-3 d-flex flex-column justify-content-center align-items-center flex-md-row align-items-md-center justify-content-md-around ">
                  <div style={{ fontSize: "20px", marginLeft: "100px" }}>
                    <div className="flex items-center gap-4">
                      <Card.Text className="name">
                        {user.firstname} {user.lastname}
                      </Card.Text>

                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 text-amber-500 me-1 mb-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20">
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <p className="ms-0 name text-sm font-medium text-gray-500 dark:text-gray-300">
                          {rating.rating}
                        </p>
                        <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                        <p className="ms-0 name text-sm font-medium text-gray-500 dark:text-gray-500">
                          {rating.numberOfVotes} reviews
                        </p>
                      </div>
                    </div>

                    {Math.floor(rating.rating) === 0 && (
                      <Rating
                        value={0}
                        readonly
                        className="scale-75 -translate-x-4 text-amber-500"
                      />
                    )}
                    {Math.floor(rating.rating) === 1 && (
                      <Rating
                        value={1}
                        readonly
                        className="scale-75 -translate-x-4 text-amber-500"
                      />
                    )}
                    {Math.floor(rating.rating) === 2 && (
                      <Rating
                        value={2}
                        readonly
                        className="scale-75 -translate-x-4 text-amber-500"
                      />
                    )}
                    {Math.floor(rating.rating) === 3 && (
                      <Rating
                        value={3}
                        className="scale-75 -translate-x-4 text-amber-500"
                      />
                    )}
                    {Math.floor(rating.rating) === 4 && (
                      <Rating
                        value={4}
                        readonly
                        className="scale-75 -translate-x-4 text-amber-500"
                      />
                    )}
                    {Math.floor(rating.rating) === 5 && (
                      <Rating
                        value={5}
                        readonly
                        className="scale-75 -translate-x-4 text-amber-500"
                      />
                    )}
                  </div>
                  <div>
                    <Button
                      variant="secondary"
                      onClick={() => setShowModal(true)}>
                      {" "}
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center align-items-center ">
          <Col
            md={10}
            className="general_info"
            style={{
              borderBottomRightRadius: " 6px",
              borderBottomLeftRadius: "6px",
            }}>
            <div className="p-2 gap-3 d-flex  flex-column flex-md-row justify-content-start">
              <Button
                variant="secondary"
                className="profile_btn"
                onClick={() => setActiveDiv("Posts")}>
                <MdFeed />
                Posts
              </Button>
              <Button
                variant="secondary"
                className="profile_btn"
                onClick={() => {
                  setActiveDiv("About");
                }}>
                <FaUser />
                About
              </Button>
              <Button
                variant="secondary"
                className="profile_btn"
                onClick={() => setActiveDiv("Followers")}>
                <FaUserFriends />
                Followers
              </Button>
              <Button
                variant="secondary"
                className="profile_btn"
                onClick={() => setActiveDiv("Following")}>
                <FaHeart></FaHeart>
                Following
              </Button>
            </div>
          </Col>
        </Row>
        {activeDiv === "Posts" && (
          <Row className="d-flex justify-content-center align-items-center mt-2 ">
            <Col
              md={10}
              className="general_info p-5"
              style={{
                borderRadius: "6px",
              }}>
              <ProfilePosts profileImg={imageUrl2}></ProfilePosts>
            </Col>
          </Row>
        )}
        {activeDiv === "About" && (
          <Row className="d-flex justify-content-center align-items-center mt-2 ">
            <Col
              md={10}
              className="general_info p-3 d-flex align-items-center justify-content-start"
              style={{
                borderRadius: "6px",
              }}>
              <Card className="about_card">
                <Card.Body className="d-flex flex-column align-items-start justify-content-start flex-lg-row ">
                  <CardBody>
                    <Card.Title
                      style={{
                        fontWeight: "bold",
                        fontSize: "30px",
                        marginBottom: "30px",
                      }}>
                      Biographie
                    </Card.Title>
                    <Card.Text style={{ width: "300px" }}>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                  </CardBody>
                  <CardBody>
                    <Card.Title
                      style={{
                        fontWeight: "bold",
                        fontSize: "30px",
                        marginBottom: "30px",
                      }}>
                      Personal Details
                    </Card.Title>

                    <Card.Text>
                      <MdEmail style={{ marginRight: "10px" }} /> {user.email}
                    </Card.Text>
                    <Card.Text>
                      <MdPhone style={{ marginRight: "10px" }} />{" "}
                      {user.telephone}
                    </Card.Text>
                    <Card.Text>
                      <GiPositionMarker style={{ marginRight: "10px" }} />{" "}
                      {user.adress}
                    </Card.Text>
                    <Card.Text>
                      <HiMiniIdentification style={{ marginRight: "10px" }} />{" "}
                      {user.cne}
                    </Card.Text>
                  </CardBody>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
        {activeDiv === "Followers" && (
          <Followers jwt={jwt} handleFollowers={setFollowers} />
        )}
        {activeDiv === "Following" && <Followings jwt={jwt} />}
        <Row className="d-flex justify-content-center align-items-center mt-2 ">
          <Col md={10}>
            <EditProfile
              showModal={showModal}
              setShowModal={setShowModal}
              userDetails={user}
              setUserDetails={setUser}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfilePage;
