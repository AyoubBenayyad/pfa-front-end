import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import SignUp from "./SignUp";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login></Login>} />
      <Route path="/register" element={<Register></Register>} />
      <Route path="/signup" element={<SignUp></SignUp>} />
    </Routes>
  );
}

export default App;
