
import "../styles/ListEditor.css";
import React from 'react'
import TextareaAutosize from "react-textarea-autosize";
import SendIcon from '@mui/icons-material/Send';

const NewTaskForm = (props) => {
    const { title,handleChangeTitle ,deleteList} = props;
    console.log("title :::::: props newtaskform >",props);
    const ref = React.createRef();


    const onEnter = e => {
      if (e.keyCode === 13) {
        e.preventDefault();
        props.saveList();
      }
    };
    
    return (
        <div className="List-Title-Edit" ref={ref}>
        <TextareaAutosize
          autoFocus
          className="List-Title-Textarea"
          placeholder="Enter list title..."
          value={title}
          onChange={handleChangeTitle}
          onKeyDown={onEnter}
        />
        {deleteList && <SendIcon  className="SendIcon" onClick={deleteList} />}
      </div>

    )
}

export default NewTaskForm