import React from "react";
import Button from "@mui/material/Button";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="home-box">
        <div className="home-text">
          <div className="text-box">
            <p>Welcome To</p>
            <h1>DEMO NOTES</h1>
          </div>
          <Link to="/Signup">
            <Button
              variant="contained"
              className="exp-btn"
              endIcon={<ArrowForwardIosRoundedIcon className="arrow-icon" />}
            >
              Signup Now
            </Button>
          </Link>
          <div>
            Already have an Account ?{" "}
            <Link to="/Login" >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
