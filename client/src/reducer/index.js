const intial = {
    lists: [],
    listAlldata: [],
    cards: [],
    cardalldata: []
}

const taskreducer = (state = intial, action) => {
    switch (action.type) {
        case 'ADD_LISTS':
            return {
                ...state,
                listAlldata: [...state.listAlldata, action.payload]
            }
        case 'GET_LISTS':
            return {
                ...state,
                listAlldata: action.payload
            }
        case "ADD_CARD": {

            return {
                ...state,
                cardalldata: [...state.cardalldata, action.payload]
            };
        }

        case "GET_CARDS": {
            return {
                ...state,
                cardalldata: action.payload
            }
        }

        // case 'MOVE_CARD':

        //     return {
        //         ...state,
        //         cardalldata: action.payload

        //         //     const allcard  = state.cardalldata;
        //     }




        case 'CHANGE_CARD_TEXT':
            const allcard = state.cardalldata
            const respoae = allcard.findIndex((card) => card._id === action.payload._id);
            allcard[respoae].title = action.payload.title;
            return {
                ...state,
                cardalldata: [...state.cardalldata, [allcard]]
            }

        case 'DELETE_CARD':
            const allcarddata = state.cardalldata
            const result = allcarddata.findIndex((card) => card._id === action.payload)
            allcarddata.splice(result, 1)
            return {
                ...state,
                cardalldata: [...state.cardalldata, [allcarddata]]
            }

        case 'MOVE_CARD':
            return {
                ...state,
                cardalldata: action.payload
            };

        case 'CHANGE_LIST_TEXT':
            const alllist = state.listAlldata
            console.log("alllist",alllist);
            const responsedata = alllist.findIndex((list) => list._id === action.payload._id);
            alllist[responsedata].title = action.payload.title;
            console.log("alllist ::: >",alllist);
            return {
                ...state,
                listAlldata: [...state.listAlldata, [alllist]]
                }

           
        case 'LIST_DATA_DELETE':
            const alllistdata = state.listAlldata;
            const deletindex = alllistdata.findIndex((list) => list._id === action.payload);
            
            alllistdata.splice(deletindex, 1)
            console.log("alllistdata",alllistdata);
            return {

                ...state,
                listAlldata: [...state.listAlldata, [alllistdata]]

            }
        default:
            return state

    }
}

export default taskreducer;