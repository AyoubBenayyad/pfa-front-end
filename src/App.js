import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login, { LLogin } from "./Login/LLogin";
import { Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import ProfilePage from "./UserProfile";
import AddAnnonce from "./Annonce/addAnnonce";
import PrivateRoute from "./privateRoute";
import UserContextProvider from "./context/UserContextProvider";
import Hpage from "./Home/homePage";
import Dashboard from "./Dashboard/Layout";
import UsersProfilePage from "./UsersProfile/UsersProfilePage";
import PrivateAuth from "./Util/PrivateAuth";
import Bookmarks from "./Bookmark/Bookmarks";
import Layout from "./LandingPage/Layout";
import { Signup } from "./SignUp/Signup";


import WsConnection from "./ChatRoom/WsConnection";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route
          path="/login"
          element={
            <>
              <LLogin/>
            </>
          }
        />
         
        <Route
          path="/signup"
          element={
                <Signup/>
                      }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <PrivateAuth authority={"USER"}>
                  <ProfilePage/>
              </PrivateAuth>
            </PrivateRoute>
          }
        />
        <Route
          path="/AddAnnonce"
          element={
            <PrivateRoute>
              <PrivateAuth authority={"USER"}>
                  <AddAnnonce/>
              </PrivateAuth>
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <PrivateAuth authority={"USER"}>
                  <Hpage/>
              </PrivateAuth>
            </PrivateRoute>
          }
        />
         <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <PrivateAuth authority={"ADMIN"}>
                  <Dashboard/>
              </PrivateAuth>
            </PrivateRoute>
          }
           />
        <Route 
          path="/bookmark" 
          element={
            <PrivateRoute>
              <PrivateAuth authority={"USER"}>
                  <Bookmarks/>
              </PrivateAuth>
            </PrivateRoute>
          }
           />
          <Route 
            path="/" 
            element={
                    <Layout/>
            }
           />
        
        <Route
          key={window.location.pathname}
          path="/UsersProfile/:userId"
          element={
            <PrivateRoute>
              <UsersProfilePage></UsersProfilePage>
            </PrivateRoute>
          }></Route>

        <Route path="/chatMessages" element={<WsConnection></WsConnection>} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
