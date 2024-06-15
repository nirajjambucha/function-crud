import { createStore } from "redux";
import handleFormDetails from "./redux/Reducer";

const store = createStore(handleFormDetails, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store; 