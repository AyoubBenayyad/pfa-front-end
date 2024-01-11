import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import Register from "./Register";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login></Login>} />
      <Route path="/register" element={<Register></Register>} />
    </Routes>
  );
}

export default App;
