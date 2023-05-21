import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Snack from "../Components/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./Login.css";

function Login(props) {
  const { username, setUsername } = props;

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [openSnack, setOpenSnack] = useState(false);
  const [snacktext, setSnacktext] = useState({
    type: "",
    msg: "",
  });

  const handleSignupSnack = () => {
    setOpenSnack(true);
  };

  const [loginload, setLoginload] = useState(false);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errmsg, setErrmsg] = useState("");

  const Navigating = () => {
    navigate("/");
  };

  const handleSubmission = (e) => {
    if (!values.email || !values.password) {
      setErrmsg("Please fill all the required fields");
      return;
    }
    setErrmsg("");
    setLoginload(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        setLoginload(false);
        setUsername(res.user.displayName);
        console.log(username);
        setSnacktext({
          type: "success",
          msg: "Welcome to Demo Notes ✨",
        });
        handleSignupSnack();
        setTimeout(Navigating, 2000);
      })
      .catch((err) => {
        setLoginload(false);
        if (
          err.message === "Firebase: Error (auth/user-not-found)." ||
          err.message === "Firebase: Error (auth/wrong-password)."
        ) {
          setSnacktext({
            type: "error",
            msg: "Invalid Credentials !!!...",
          });
          handleSignupSnack();
        } else setErrmsg(err.message);
      });
  };

  const handleForgotpass = () => {
    sendPasswordResetEmail(auth, values.email)
      .then(() => {
        setSnacktext({
          type: "info",
          msg: "Please check your Email to reset your password",
        });
        handleSignupSnack();
      })
      .catch((err) => {
        if (err.message === "Firebase: Error (auth/missing-email).") {
          setSnacktext({
            type: "error",
            msg: "Please provide your registered email to retrieve your password ...",
          });
        } else {
          setSnacktext({
            type: "error",
            msg: "Something Went Wrong !!!... 😞",
          });
        }
        handleSignupSnack();
      });
  };
  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="login-creds">
            <h3>Welcome Back</h3>
            <p>Please Enter Your Login Credentials</p>
            <div className="login-form">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  label="Email"
                  variant="standard"
                  type="text"
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                />
                <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                  <InputLabel required htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={(event) =>
                      setValues((prev) => ({
                        ...prev,
                        password: event.target.value,
                      }))
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Button
                  sx={{ mt: 1, mr: 1 }}
                  className="login-btn"
                  variant="contained"
                  onClick={handleSubmission}
                >
                  {loginload ? <CircularProgress color="inherit" /> : "Login"}
                </Button>
                <div className="signup-link">
                  New Member ? <Link to="/Signup">Sign Up</Link>
                </div>
              </Box>
              <div className="forgot-pass">
                <Button
                  variant="outlined"
                  className="forgot-btn"
                  onClick={handleForgotpass}
                >
                  Forgot Password
                </Button>
              </div>
              <div className="err-msg">{errmsg}</div>
            </div>
          </div>
          <div className="login-image">
            <div className="login-close">
              <Link to="/">
                <CloseRoundedIcon />
              </Link>
            </div>
          </div>
          <div className="login-close out-close">
            <Link to="/">
              <CloseRoundedIcon />
            </Link>
          </div>
        </div>
        <Snack
          type={snacktext.type}
          msg={snacktext.msg}
          open={openSnack}
          setOpen={setOpenSnack}
        />
      </div>
    </>
  );
}

export default Login;
