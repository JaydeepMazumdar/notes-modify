import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
// import WorkingArea from "./Pages/WorkingArea";
import AuthNavMenu from "./Components/AuthNavMenu";
import { auth } from "./firebase";
import "./App.css";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState("false");
  const [profile, setProfile] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setProfile(user.displayName);
      } else {
        setProfile("");
      }
    });
  },[]);

  return (
    <>
      <Router>
        <div>
          <Routes>
            {profile === "" ?
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <Navbar />
                </>
              }
            />
            :
            <Route
              path="/"
              element={
                <>
                  <AuthNavMenu username = {profile} setUsername = {setProfile} />
                  {/* <WorkingArea /> */}
                </>
              }
            />}
            <Route path="/Login" element={<Login username = {profile} setUsername = {setProfile} />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
