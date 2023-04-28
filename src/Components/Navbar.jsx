import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./Navbar.css";


function Navbar() {
  return (
    <div>
      <nav>
        <Link to="/">
          <div className="logo"></div>
        </Link>
        <div className="auth-box">
          <Link to="/Login">
            <Button
              variant="outlined"
              className="auth-btn login"
              style={{ border: "2px solid #7B3F00", color: "#7B3F00" }}
            >
              Login
            </Button>
          </Link>
          <Link to="/Signup">
            <Button
              variant="contained"
              className="auth-btn signup"
              style={{ background: "#7B3F00", color: "#FFD700" }}
            >
              Signup
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
