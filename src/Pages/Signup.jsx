import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
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
import {
  createUserWithEmailAndPassword,
  updateProfile,
  // sendEmailVerification,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./Signup.css";

function Signup() {
  const [openSnack, setOpenSnack] = useState(false);
  const [snacktext, setSnacktext] = useState({
    type: "",
    msg: "",
  });

  const handleSignupSnack = () => {
    setOpenSnack(true);
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const [signupload, setSignupload] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errmsg, setErrmsg] = useState("");

  const Navigating = () => {
    navigate("/Login");
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    if (!values.username || !values.email || !values.password) {
      setErrmsg("Please fill all the required fields");
      return;
    }
    setErrmsg("");
    setSignupload(true);

    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        const user = res.user;
        updateProfile(user, { displayName: values.username });
        setSignupload(false);
        setSnacktext({
          type: "success",
          msg: "Your account has successfully been registered.",
        });
        handleSignupSnack();
        setTimeout(Navigating, 2000);
      })
      .catch((err) => {
        setSignupload(false);
        if (err.message === "Firebase: Error (auth/email-already-in-use).") {
          setSnacktext({
            type: "error",
            msg: "This email has already been registered !!!...",
          });
          handleSignupSnack();
        } else setErrmsg(err.message);
      });
  };

  return (
    <>
      <div className="signup-page">
        <div className="signup-box">
          <div className="signup-creds">
            <h3>Register Now</h3>
            <p>Please fill out the form below</p>
            <div className="signup-form">
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
                  label="Username"
                  variant="standard"
                  type="text"
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      username: event.target.value,
                    }))
                  }
                />
                <TextField
                  required
                  label="Email"
                  variant="standard"
                  type="email"
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
                  className="signup-btn"
                  variant="contained"
                  onClick={handleSubmission}
                >
                  {signupload ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    "Register"
                  )}
                </Button>
                <div className="signup-link">
                  Already a member ? <Link to="/Login">Login</Link>
                </div>
              </Box>
              <div className="err-msg">{errmsg}</div>
            </div>
          </div>
          <div className="signup-image">
            <div className="signup-close">
              <Link to="/">
                <CloseRoundedIcon />
              </Link>
            </div>
          </div>
          <div className="signup-close out-close">
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

export default Signup;
