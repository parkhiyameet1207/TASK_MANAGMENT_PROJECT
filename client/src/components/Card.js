import "../styles/Card.css";

import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

import CardEditor from "./CardEditor";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import { deleteAsyncCardData, editCardTitleAsyncData, getAllCardAsyncData } from "../action";

function Card(props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    hover: false,
    editing: false
  })
  const startHover = () => setState({ hover: true });
  const endHover = () => setState({ hover: false });

  const startEditing = () =>
    setState({
      hover: false,
      editing: true,
    });

  const endEditing = () => setState({ hover: false, editing: false });

  const editCard = async (text) => {
    dispatch(editCardTitleAsyncData(text, props.listId))
    toggleEditingTitle();
  };


  const toggleEditingTitle = () =>
    setState({ editingTitle: !state.editingTitle });

  const deleteCard = async () => {
      dispatch(deleteAsyncCardData(data._id))
    toggleEditingTitle();
  };


  
  useEffect(() => {
    dispatch(getAllCardAsyncData());
  }, [])


  const { card, index, data } = props;
  const { hover, editing } = state;

  if (!editing) {
    return (

      <Draggable draggableId={props.listId} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="Card"
            onMouseEnter={startHover}
            onMouseLeave={endHover}
          >
            {hover && (
              <div className="Card-Icons">
                <div className="Card-Icon" onClick={startEditing}>
                  <EditIcon sx={{ fontSize: '16px' }} />
                </div>
              </div>
            )}

            {data.title}
          </div>
        )}
      </Draggable>
    );
  } else {
    return (
      <CardEditor
        text={data.title}
        onSave={editCard}
        onDelete={deleteCard}
        onCancel={endEditing}
      />

    );
  }
}


export default Card;

