import React, { useState, useEffect } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import NoteModal from "../Components/NoteModal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { v4 } from "uuid";
import "./WorkingArea.css";

function WorkingArea(props) {
  const [modal, setModal] = useState(false);
  const [values, setValues] = useState({});
  const [arr, updateArr] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "users", props.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        updateArr([...docSnap.data().array]);
      } else {
        console.log("No such document!");
      }
    };
    getData();
  }, [props.email]);

  const dataupload = (array) => {
    const cityRef = doc(db, "users", props.email);
    console.log(array);
    setDoc(cityRef, {array});
  };

  const handlemodal = () => {
    setModal(true);
    setValues({
      id: v4(),
      text: undefined,
      title: undefined,
    });
  };
  
  const deleteNote = (id) =>{
    let curr = arr;
    console.log(id);
    curr=curr.filter((items) => items.id !== id);;
    console.log(curr);
    updateArr(curr);
    dataupload(curr);
  }

  const opennote = () => {
    setModal(true);
  };

  const rendernotes = arr.map((item, index) => (
    <Card sx={{ maxWidth: 345 }} className="note" key={index}>
      <CardActionArea
        className="note-content"
        onClick={() => {
          setValues(item);
          opennote();
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="note-delete">
        <Button
          size="small"
          className="del-btn"
          startIcon=<DeleteForeverIcon />
          color="primary"
          id = {item.id}
          onClick={(e) => {
            console.log(e.target.id)
            deleteNote(e.target.id);
          }}
        >
          delete
        </Button>
      </CardActions>
    </Card>
  ));

  return (
    <>
      <div className="work-area">
        <div className="notes-window">{rendernotes}</div>
        <div className="addnote-btn">
          <Tooltip title="Add Note" placement="top">
            <IconButton className="icon-back" onClick={handlemodal}>
              <EditNoteIcon className="add-icon" />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {values.title !== undefined &&
      values.text !== undefined &&
      values.id !== undefined ? (
        <NoteModal
          open={modal}
          setOpen={setModal}
          title={values.title}
          text={values.text}
          id={values.id}
          arr={arr}
          update={true}
          updateArr={updateArr}
          dataupload={dataupload}
        />
      ) : (
        <NoteModal
          open={modal}
          setOpen={setModal}
          arr={arr}
          update={false}
          title=""
          text=""
          id={values.id}
          updateArr={updateArr}
          dataupload={dataupload}
        />
      )}
    </>
  );
}

export default WorkingArea;
