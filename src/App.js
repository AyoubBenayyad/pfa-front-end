import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Login";
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
                <SignUp/>
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
          key={window.location.pathname}
          path="/UsersProfile/:userId"
          element={
            <PrivateRoute>
              <UsersProfilePage></UsersProfilePage>
            </PrivateRoute>
          }></Route>

         
      </Routes>
    </UserContextProvider>
  );
}

export default App;
