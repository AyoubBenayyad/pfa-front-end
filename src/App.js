import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import SignUp from "./SignUp";
import ProfilePage from "./UserProfile";
import addAnnonce from "./Annonce/addAnnonce";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login></Login>} />
      <Route path="/register" element={<Register></Register>} />
      <Route path="/signup" element={<SignUp></SignUp>} />
      <Route path="/profile" element={<ProfilePage></ProfilePage>} />
      <Route path="/AddAnnonce" element={<addAnnonce></addAnnonce>} />
    </Routes>
  );
}

export default App;
