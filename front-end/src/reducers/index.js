import {combineReducers} from "redux";
import SingleUserReducer from "./SingleUserReducer";
import usersReducer from "./UsersReducer";
import LogInReducer from "./LogInReducer";

const reducer = combineReducers({
    usersData: usersReducer,
    singleUser: SingleUserReducer,
    tokenState: LogInReducer
});

export default reducer;