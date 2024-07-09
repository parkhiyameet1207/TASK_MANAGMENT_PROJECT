import "../styles/CardEditor.css";

import React, { Component, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
// import EditButtons from "./EditButtons";
import { useDispatch, useSelector } from "react-redux";
import EditButtons from "./EditButtons";
import { getAllCardAsyncData } from "../action";
import DeleteIcon from '@mui/icons-material/Delete';


function Listeditor(props) {
    const ref = React.createRef();
    const { deleteList, saveListdata } = props

    const dispatch = useDispatch();
    const [state, setState] = useState({
        text: props.title || ""
    })


    const handleChangeText = event => setState({ text: event.target.value });

    const onsubmit = (e) => {
        const { text } = state;
        if (e.keyCode === 13) {
            e.preventDefault();
            saveListdata(text);
        }
    };


    const { text } = state;

    return (

        <div className="List-Title-Edit" ref={ref}>
            <TextareaAutosize
                autoFocus
                className="List-Title-Textarea"
                value={text}
                onChange={handleChangeText}
                onKeyDown={onsubmit}
            />

            {deleteList && <DeleteIcon className="SendIcon" onClick={deleteList} />}

        </div >
    );

}

export default Listeditor;
