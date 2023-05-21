import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import KeyIcon from "@mui/icons-material/Key";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Divider from "@mui/material/Divider";
import UpdateModal from "./updateModal";
import DeleteModal from "./DeleteModal";
import "./AuthNavMenu.css";

function AuthNavMenu(props) {
  const { username, setUsername } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [openUpdate, setopenUpdate] = useState(false);
  const [openDeleteModal, setopenDeleteModal] = useState(false);
  const [openhelp, setopenhelp] = useState(false);
  const openSettings = Boolean(anchorEl);
  const handleSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseSettings = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const Navigating = () => {
    navigate("/");
  };

  const handleLogout = () => {
    signOut(auth)
      .then(async () => {
        console.log("logged Out ");
        setUsername("");
        setTimeout(Navigating, 2000);
      })
      .catch((err) => {
        console.log("Something went wrong !!!...");
      });
  };

  const updatepass = () => {
    handleCloseSettings();
    setopenUpdate(true);
  };

  const deleteacc = () => {
    handleCloseSettings();
    setopenDeleteModal(true);
  };

  return (
    <>
      <nav className="auth-nav">
        <Link to="/" onClick={() => window.location.reload(true)}>
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
                  style={openhelp ? { height: "21rem" } : { height: "12rem" }}
                >
                  <MenuItem onClick={updatepass}>
                    <KeyIcon className="settings-icons" />
                    Change password
                  </MenuItem>
                  <Divider className="divider" />
                  <MenuItem onClick={deleteacc}>
                    <DeleteRoundedIcon className="settings-icons" />
                    Delete Account
                  </MenuItem>
                  <Divider className="divider" />
                  <MenuItem
                    onClick={() => {
                      setopenhelp(!openhelp);
                    }}
                  >
                    <HelpOutlineRoundedIcon className="settings-icons" />
                    Help
                    {openhelp ? (
                      <ExpandLessRoundedIcon className="expandicons" />
                    ) : (
                      <ExpandMoreRoundedIcon className="expandicons" />
                    )}
                  </MenuItem>
                  <Collapse in={openhelp} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <Link
                        to="https://api.WhatsApp.com/send?phone:+917439115861"
                        target="_blank"
                        className="listicons"
                      >
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                            <WhatsAppIcon />
                          </ListItemIcon>
                          <ListItemText primary="Chat with us" />
                        </ListItemButton>
                      </Link>
                      <a href="tel:+917439115861" className="listicons">
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                            <CallRoundedIcon />
                          </ListItemIcon>
                          <ListItemText primary="Call us" />
                        </ListItemButton>
                      </a>
                      <a
                        href="mailto:jmazumdar02@gmail.com"
                        className="listicons"
                      >
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                            <MailOutlineRoundedIcon />
                          </ListItemIcon>
                          <ListItemText primary="Mail us" />
                        </ListItemButton>
                      </a>
                    </List>
                  </Collapse>
                </Menu>
              </IconButton>
            </Tooltip>
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
        </div>
      </nav>
      <UpdateModal open={openUpdate} setOpen={setopenUpdate} />
      <DeleteModal open={openDeleteModal} setOpen={setopenDeleteModal} />
    </>
  );
}

export default AuthNavMenu;
