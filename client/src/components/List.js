import "../styles/AddList.css";

import React, { Component, useState } from "react";
import { connect, useDispatch } from "react-redux";
import shortid from "shortid";
import axios from "axios";
import NewTaskForm from "./NewTaskForm";
import { addAllListAsyncData, getAllListAsyncData } from "../action";

function AddList(props) {
    const dispatch = useDispatch();
    const { toggleAddingList } = props;
    const [state, setState] = useState({
        title: "",
    })

    const { title } = state;

    const handleChangeTitle = e => setState({ title: e.target.value })


    const createList = async () => {
        const listId = shortid.generate();
        let data = { listId, title};
         dispatch(addAllListAsyncData(data));
        toggleAddingList();
    };



    return (
        <div className="Add-List-Editor">
            <NewTaskForm
                title={title}
                handleChangeTitle={handleChangeTitle}
                onClickOutside={toggleAddingList}
                saveList={createList}
            />
        </div>
    );
}

export default AddList;
