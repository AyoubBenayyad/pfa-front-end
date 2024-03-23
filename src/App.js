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
import Hpage from "./Home/homePage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route
          path="/login"
          element={
            <>
              <Login></Login>
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <SignUp></SignUp>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage></ProfilePage>
            </PrivateRoute>
          }
        />
        <Route
          path="/AddAnnonce"
          element={
            <PrivateRoute>
              <AddAnnonce></AddAnnonce>
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Hpage></Hpage>
            </PrivateRoute>
          }
        />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
