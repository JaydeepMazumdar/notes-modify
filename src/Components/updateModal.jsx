import React, { useState } from "react";
import { Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Snack from "../Components/Snackbar";
import { useNavigate } from "react-router-dom";
import "./updateModal.css";

function UpdateModal(props) {
  const { open, setOpen } = props;
  const navigate = useNavigate();
  const [values, setValues] = useState({
    pass: "",
    newpass: "",
    confnewpass: "",
  });
  const [updateload, setupdateload] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snacktext, setSnacktext] = useState({
    type: "",
    msg: "",
  });

  const handleSignupSnack = () => {
    setOpenSnack(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const Navigating = () => {
    navigate("/Login");
  };

  const submitdata = () => {
    setupdateload(true);
    if (JSON.stringify(values.newpass) === JSON.stringify(values.confnewpass)) {
      const user = auth.currentUser;
      const newPassword = values.newpass;

      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        values.pass
      );

      reauthenticateWithCredential(user, credential)
        .then(async () => {
          console.log("User re-authenticated.");
          await updatePassword(user, newPassword)
            .then(() => {
              console.log("Successful");
              setSnacktext({
                type: "success",
                msg: "Your password has been successfully updated 😊.",
              });
              handleSignupSnack();
              setupdateload(false);
              handleClose();
              setTimeout(Navigating, 2000);
            })
            .catch((error) => {
              setSnacktext({
                type: "info",
                msg: "Your password should atleast contain 6 characters.",
              });
              handleSignupSnack();
              setupdateload(false);
            });
        })
        .catch((error) => {
          setSnacktext({
            type: "error",
            msg: "you should enter your current password correctly !!!...😡",
          });
          handleSignupSnack();
          setupdateload(false);
          handleClose();
        });
    } else {
      setupdateload(false);
      setSnacktext({
        type: "error",
        msg: "New password and confirm new password are not same !!!...🙄",
      });
      handleSignupSnack();
      console.log("not same");
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} className="updatebox">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: "1rem", width: "95%" },
          }}
          noValidate
          autoComplete="off"
          className="updatingArea"
        >
          <CloseRoundedIcon onClick={handleClose} className="closebtn" />
          <h3>Update Password</h3>
          <TextField
            label="Enter Current Password"
            variant="outlined"
            type="text"
            onChange={(event) =>
              setValues((prev) => ({
                ...prev,
                pass: event.target.value,
              }))
            }
          />
          <TextField
            label="Enter New Password"
            variant="outlined"
            type="text"
            onChange={(event) =>
              setValues((prev) => ({
                ...prev,
                newpass: event.target.value,
              }))
            }
          />
          <TextField
            label="Confirm New Password"
            variant="outlined"
            type="text"
            onChange={(event) =>
              setValues((prev) => ({
                ...prev,
                confnewpass: event.target.value,
              }))
            }
          />
          <Button className="changebtn" variant="outlined" onClick={submitdata}>
            {updateload ? <CircularProgress color="inherit" /> : "Change"}
          </Button>
        </Box>
      </Dialog>
      <Snack
        type={snacktext.type}
        msg={snacktext.msg}
        open={openSnack}
        setOpen={setOpenSnack}
      />
    </>
  );
}

export default UpdateModal;
