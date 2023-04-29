import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Divider from "@mui/material/Divider";
import Snack from "./Snackbar";
import "./AuthNavMenu.css";

function AuthNavMenu(props) {
  const { username, setUsername } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const openSettings = Boolean(anchorEl);
  const handleSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSettings = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const [openSnack, setOpenSnack] = useState(false);
  const [snacktext, setSnacktext] = useState({
    type: "",
    msg: "",
  });

  const Navigating = () => {
    navigate("/");
  };

  const handleSignupSnack = () => {
    setOpenSnack(true);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(async() => {
        setSnacktext({
          type: "info",
          msg: "You have successfully Logged Out !!!...",
        });
        console.log("logged Out ");
        setUsername("")
        handleSignupSnack();
        setTimeout(Navigating, 2000);
      })
      .catch((err) => {
        console.log("Something went wrong !!!...")
      });
  };

  return (
    <>
      <nav>
        <Link to="/Notes" onClick={() => window.location.reload(true)}>
          <div className="logo"></div>
        </Link>
        <div className="logout-menu">
          <div className="welcome">
            <h3>Welcome {username}</h3>
          </div>
          <div className="settings">
            <Tooltip title="Account Settings" placement="top">
              <IconButton>
                <SettingsRoundedIcon
                  className="SettingsIcon"
                  aria-controls={openSettings ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openSettings ? "true" : undefined}
                  onClick={handleSettings}
                />
                <Menu
                  className="menu-list"
                  anchorEl={anchorEl}
                  open={openSettings}
                  onClose={handleCloseSettings}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleCloseSettings}>
                    Change Email
                  </MenuItem>
                  <Divider className="divider" />
                  <MenuItem onClick={handleCloseSettings}>
                    Change password
                  </MenuItem>
                  <Divider className="divider" />
                  <MenuItem onClick={handleCloseSettings}>
                    Delete Account
                  </MenuItem>
                </Menu>
              </IconButton>
            </Tooltip>
          </div>
          <Button
            variant="contained"
            className="logout"
            startIcon=<PowerSettingsNewRoundedIcon />
            endIcon=<ArrowForwardIosRoundedIcon />
            onClick={handleLogout}
            style={{ background: "#7B3F00", color: "#FFD700" }}
          >
            Logout
          </Button>
        </div>
      </nav>
      <Snack
        type={snacktext.type}
        msg={snacktext.msg}
        open={openSnack}
        setOpen={setOpenSnack}
      />
    </>
  );
}

export default AuthNavMenu;
