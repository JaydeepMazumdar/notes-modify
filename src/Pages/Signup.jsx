import React from "react";
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
import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
                  id="standard-basic"
                  label="Username"
                  variant="standard"
                  type="text"
                />
                <TextField
                  required
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  type="email"
                />
                <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
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
                  type="submit"
                  variant="contained"
                >
                  Register
                </Button>
                <div className="signup-link">
                  Already a member ? <Link to="/Login">Login</Link>
                </div>
              </Box>
            </div>
          </div>
          <div className="signup-image">
            <div className="signup-close">
              <Link to="/">
                <CloseRoundedIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
