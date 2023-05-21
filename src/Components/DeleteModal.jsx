import React, { useState } from "react";
import { Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";
import { auth, db } from "../firebase";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Snack from "../Components/Snackbar";
import { doc, deleteDoc } from "firebase/firestore";
import "./updateModal.css";

function DeleteModal(props) {
  const { open, setOpen } = props;
  const [deleteload, setdeleteload] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [values, setvalues] = useState({
    currpass: "",
  });
  const [snacktext, setSnacktext] = useState({
    type: "",
    msg: "",
  });

  const handleSnack = () => {
    setOpenSnack(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deleteAcc = () => {
    setdeleteload(true);
    const user = auth.currentUser;

    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      values.currpass
    );

    reauthenticateWithCredential(user, credential)
      .then(async () => {
        console.log("User re-authenticated.");
        await deleteUser(user)
          .then(async() => {
            await deleteDoc(doc(db, "users", user.email));
            console.log("Account Deleted")
            handleClose();
          })
          .catch((error) => {
            setSnacktext({
              type: "error",
              msg: "Something Went Wrong !!!...😢",
            });
            handleSnack();
            setdeleteload(false);
          });
      })
      .catch((error) => {
        setSnacktext({
          type: "error",
          msg: "you should enter your current password correctly !!!...😡",
        });
        handleSnack();
        setdeleteload(false);
      });
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
          <h3>Account Deletion</h3>
          <p>Please Authenticate yourself to delete your Account.</p>
          <TextField
            label="Enter Current Password"
            variant="outlined"
            type="text"
            onChange={(event) =>
              setvalues((prev) => ({
                ...prev,
                currpass: event.target.value,
              }))
            }
          />
          <Button className="changebtn" variant="outlined" onClick={deleteAcc}>
            {deleteload ? <CircularProgress color="inherit" /> : "Delete"}
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

export default DeleteModal;
