import {combineReducers} from "redux";
import SingleUserReducer from "./SingleUserReducer";
import usersReducer from "./UsersReducer";

const reducer = combineReducers({
    usersData: usersReducer,
    singleUser: SingleUserReducer
});

export default reducer;