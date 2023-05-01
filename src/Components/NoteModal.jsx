import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { v4 } from "uuid";
import "./NoteModal.css";

function NoteModal(props) {
  const { open, setOpen, arr, updateArr, title, id, text, dataupload, update } =
    props;

  const [values, setValues] = useState({
    id: v4(),
    title: "",
    text: "",
  });

  useEffect(() => {
    if (id !== undefined || id !== 0) {
      setValues({ id: id });
    }
    if (title !== undefined) {
      setValues((prev) => ({
        ...prev,
        title: title,
      }));
    }
    if (text !== undefined) {
      setValues((prev) => ({
        ...prev,
        text: text,
      }));
    }
  }, [title, text, id]);

  const savedata = () => {
    if (!values.text && !values.title && !values.id) return;
    let currArray = arr;
    currArray.push(values);
    updateArr(currArray);
    dataupload(currArray);
  };

  const updatenote = () => {
    console.log(values);
    let curr = arr;
    curr.forEach((currentValue) => {
      if (currentValue.id === values.id) {
        currentValue.text = values.text;
        currentValue.title = values.title;
      }
    });
    updateArr(curr);
    dataupload(curr);
  };

  return (
    <>
      <Dialog open={open} maxWidth="xl" className="dialog">
        <div className="edit-modal">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: "1rem", width: "95%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Enter Title"
              variant="outlined"
              type="text"
              className="note-heading"
              value={values.title}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  title: event.target.value,
                }))
              }
            />
            <textarea
              style={{
                resize: "none",
                fontSize: "1.1rem",
              }}
              placeholder="Start Typing ..."
              className="note-textarea"
              value={values.text}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  text: event.target.value,
                }))
              }
            />
          </Box>
          <div className="control-buttons">
            <Button
              variant="outlined"
              className="logout"
              onClick={() => {
                setOpen(false);
                setValues({
                  id: v4(),
                  title: "",
                  text: "",
                });
              }}
            >
              cancel
            </Button>
            {update === false ? (
              <Button
                variant="contained"
                className="logout"
                onClick={() => {
                  setOpen(false);
                  setValues({
                    id: v4(),
                    title: "",
                    text: "",
                  });
                  savedata();
                }}
              >
                save
              </Button>
            ) : (
              <Button
                variant="contained"
                className="logout"
                onClick={() => {
                  setOpen(false);
                  updatenote();
                }}
              >
                update
              </Button>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default NoteModal;
