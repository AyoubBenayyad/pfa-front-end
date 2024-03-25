import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardText,
  Button,
  Image,
  ListGroup,
  Form,
  Modal,
} from "react-bootstrap";
import "../UserProfile/ProfileInfo.css";
import { NavBar } from "../NavBars/Nav";
import SideBar from "../NavBars/Side";
import { HiMiniIdentification } from "react-icons/hi2";
import {
  FaAddressBook,
  FaEnvelope,
  FaHeart,
  FaPhone,
  FaUser,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";
import { MdEmail, MdFeed, MdPhone } from "react-icons/md";
import EditProfile from "./EditProfile";
import { useLocalState } from "../Util/useLocalStorage";
import fetchService from "../Services/fetchService";
import Followers from "./Followers";
import { Navigate, useNavigate } from "react-router-dom";
import Followings from "./Followings";
import Post from "./Post";
import Posts from "./ProfilePosts";
import ProfilePosts from "./ProfilePosts";
import { Rating } from "@material-tailwind/react";
import UserContext from "../context/UserContext";
import RatingStatic from "./RatingStatic";
function ProfilePage() {
  const navigate = useNavigate();
  const [jwt, setJwt] = useLocalState("", "token");
  const [imageUrl, setImageUrl] = useState(null);

  const [imageUrl2, setImageUrl2] = useState(null);
  const [activeDiv, setActiveDiv] = useState("Posts");
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
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
    password: "ayoub2010",
    niveau: "FirstYear",
    followersNumber: 100,
  };

  const [user, setUser] = useState(userData);
  useEffect(() => {
    // Change the body color when the component mounts
    document.body.style.backgroundColor = "#8EC5FC";
    document.body.style.backgroundImage =
      "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)";
    // fetching user details
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
        setRating(data.rating);
        console.log(LoggedUser);
      })
      .catch((err) => {
        console.log(err);
      });
    // Reset the body color when the component unmounts
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  return (
    <>
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
                    <Card.Text className="name">
                      {user.firstname} {user.lastname}
                    </Card.Text>
                    {rating === 0 && (
                      <Rating
                        value={0}
                        readonly
                        className="scale-75 -translate-x-4 text-amber-500"
                      />
                    )}
                    {rating === 1 && (
                      <Rating
                        value={1}
                        readonly
                        className="scale-75 -translate-x-4 text-amber-500"
                      />
                    )}
                    {rating === 2 && (
                      <Rating
                        value={2}
                        readonly
                        className="scale-75 -translate-x-4 text-amber-500"
                      />
                    )}
                    {rating === 3 && (
                      <Rating
                        value={3}
                        className="scale-75 -translate-x-4 text-amber-500"
                      />
                    )}
                    {rating === 4 && (
                      <Rating
                        value={4}
                        readonly
                        className="scale-75 -translate-x-4 text-amber-500"
                      />
                    )}
                    {rating === 5 && (
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
    </>
  );
}

export default ProfilePage;
