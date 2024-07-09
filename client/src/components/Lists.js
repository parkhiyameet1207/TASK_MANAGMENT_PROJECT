import "../styles/List.css";

import React, { Component, memo, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

// import Card from "./Card";
// import CardEditor from "./CardEditor";
// import ListEditor from "./ListEditor";
// import AddIcon from '@mui/icons-material/Add';

import shortid from "shortid";
import axios from "axios";
import { set } from "mongoose";
import NewTaskForm from "./NewTaskForm";
import CardEditor from "./CardEditor";
import Card from "./Card";
import { addCardAsyncData, ChangeListTitle, deleteListTitle, getAllCardAsyncData } from "../action";
import store from "../store";
import AddIcon from '@mui/icons-material/Add';
import Listeditor from "./Listeditor";


function List(props) {

  const card = useSelector(state => state.taskreducer.cardalldata);

  const { listId, index, data } = props;
  const dispatch = useDispatch()
  const [listedit, setListedit] = useState(false);

  const [state, setState] = useState({
    editingTitle: false,
    title: data.title,
    addingCard: false
  });
  const { editingTitle, addingCard, title } = state;

  const [carddata, setCarddata] = useState(false)


  const toggleAddingCard = () =>
    setState({ addingCard: !state.addingCard });
  const cardId = shortid.generate();
  const addCard = async (cardText) => {
    
   
    toggleAddingCard();
    const data = {
      cardText,
      cardId,
      listId,
    }

    dispatch(addCardAsyncData(data));

  };
  const toggleEditingTitle = () =>
    setState({ editingTitle: !state.editingTitle });

  const handleChangeTitle = e => setState({ title: e.target.value });

  const editListTitle = async (text) => {
    console.log("edited text", text);
    dispatch(ChangeListTitle(text, listId));
    toggleEditingTitle();
  };

  const deleteList = async () => {
    dispatch(deleteListTitle(listId));
    toggleEditingTitle();

   
  };
  const filteredCards = card?.filter(card => card.listId === listId);

  useEffect(() => {
    dispatch(getAllCardAsyncData());
  }, [dispatch])

  return (

    <Draggable draggableId={data._id} index={index} >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="List"
        >
          {editingTitle ? (
            <Listeditor
              title={data.title}
              handleChangeTitle={handleChangeTitle}
              saveListdata={editListTitle}
              onClickOutside={editListTitle}
              deleteList={deleteList}
            />

          ) : (
            <div className="List-Title">
              <div className="list-title" onClick={toggleEditingTitle}>
                {data.title}
              </div>
              <div className="icon-more">
                {/* <MoreVertIcon /> */}
              </div>
            </div>
          )}

          <Droppable droppableId={data._id}>
            {(provided, _snapshot) => (
              <div ref={provided.innerRef} className="Lists-Cards">
                {filteredCards &&
                  filteredCards.map((val, index) => (
                    <Card
                      key={index}
                      data={val}
                      index={index}
                      listId={val._id}
                    />
                  ))}

                {provided.placeholder}

                {addingCard ? (

                  <CardEditor
                    onSave={addCard}
                    onCancel={toggleAddingCard}
                    adding
                  />
                ) : (
                  <div className="Toggle-Add-Card" onClick={toggleAddingCard}>
                    <AddIcon sx={{ mr: 1, color: '#378CE7' }} />Add a card
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}


export default React.memo(List);

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Droppable, Draggable } from "react-beautiful-dnd";
// import shortid from "shortid";
// import AddIcon from '@mui/icons-material/Add';
// import NewTaskForm from "./NewTaskForm";
// import CardEditor from "./CardEditor";
// import Card from "./Card";
// import { addCardAsyncData, getAllCardAsyncData } from "../action";

// function List(props) {
//   const dispatch = useDispatch();
//   const card = useSelector((state) => state.taskreducer.cardalldata);
//   const { listId, index, data } = props;

//   const [state, setState] = useState({
//     editingTitle: false,
//     title: data.title,
//     addingCard: false,
//   });

//   const { editingTitle, addingCard, title } = state;

//   const toggleAddingCard = () =>
//     setState((prevState) => ({ ...prevState, addingCard: !prevState.addingCard }));

//   const addCard = async (cardText) => {
//     toggleAddingCard();

//     const newCard = {
//       cardText,
//       cardId: shortid.generate(),
//       listId,
//     };

//     await dispatch(addCardAsyncData(newCard));
//   };

//   const toggleEditingTitle = () =>
//     setState((prevState) => ({ ...prevState, editingTitle: !prevState.editingTitle }));

//   const handleChangeTitle = (e) => setState({ ...state, title: e.target.value });

//   const editListTitle = async () => {
//     const { title } = state;
//     toggleEditingTitle();
//     // Update list title logic here...
//   };

//   const deleteList = async () => {
//     if (window.confirm("Are you sure to delete this list?")) {
//       // Delete list logic here...
//     }
//   };

//   const filteredCards = card?.filter((card) => card.listId === listId);

//   useEffect(() => {
//     dispatch(getAllCardAsyncData());
//   }, [dispatch]);

//   return (
//     <Draggable draggableId={data._id} index={index}>
//       {(provided, snapshot) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           className="List"
//         >
//           {editingTitle ? (
//             <NewTaskForm
//               title={title}
//               handleChangeTitle={handleChangeTitle}
//               saveList={editListTitle}
//               onClickOutside={editListTitle}
//               deleteList={deleteList}
//             />
//           ) : (
//             <div className="List-Title" onClick={toggleEditingTitle}>
//               {title}
//             </div>
//           )}

//           <Droppable droppableId={data._id}>
//             {(provided, _snapshot) => (
//               <div ref={provided.innerRef} className="Lists-Cards">
//                 {filteredCards &&
//                   filteredCards.map((val, index) => (
//                     <Card
//                       key={val.cardId}
//                       cardId={val.cardId}
//                       index={index}
//                       listId={val.listId}
//                     />
//                   ))}

//                 {provided.placeholder}

//                 {addingCard ? (
//                   <CardEditor onSave={addCard} onCancel={toggleAddingCard} adding />
//                 ) : (
//                   <div className="Toggle-Add-Card" onClick={toggleAddingCard}>
//                     <AddIcon sx={{ mr: 1 }} /> Add a card
//                   </div>
//                 )}
//               </div>
//             )}
//           </Droppable>
//         </div>
//       )}
//     </Draggable>
//   );
// }

// export default React.memo(List);

