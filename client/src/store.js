import mainreducer from "./reducer/mainreducer";
import { applyMiddleware, compose, createStore } from "redux";
import { thunk } from "redux-thunk";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(mainreducer, composeEnhancers(applyMiddleware(thunk)));

export default store