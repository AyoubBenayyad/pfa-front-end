import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import ProfilePage from "./UserProfile";
import AddAnnonce from "./Annonce/addAnnonce";
import PrivateRoute from "./privateRoute";
import CommentSection from "./UserProfile/CommentSection";
import UserContextProvider from "./context/UserContextProvider";
import { NavBar } from "./NavBars/Nav";
import SideBar from "./NavBars/Side";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route
          path="/login"
          element={
            <>
              <NavBar></NavBar>
              <SideBar></SideBar>
              <Login></Login>
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <NavBar></NavBar>
              <SideBar></SideBar>
              <SignUp></SignUp>
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <NavBar></NavBar>
              <SideBar></SideBar>
              <SignUp></SignUp>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <NavBar></NavBar>
              <SideBar></SideBar>
              <ProfilePage></ProfilePage>
            </PrivateRoute>
          }
        />
        <Route
          path="/AddAnnonce"
          element={
            <PrivateRoute>
              <NavBar></NavBar>
              <SideBar></SideBar>
              <AddAnnonce></AddAnnonce>
            </PrivateRoute>
          }
        />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
