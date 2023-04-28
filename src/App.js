import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import './App.css';

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<><Home /><Navbar /></>} />     
          </Routes>
          <Routes>
            <Route path="/Login" element={<Login />} />     
          </Routes>
          <Routes>
            <Route path="/Signup" element={<Signup />} />     
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
