import {combineReducers} from "redux";
import SingleUserReducer from "./SingleUserReducer";
import usersReducer from "./UsersReducer";
import LogInReducer from "./LogInReducer";
import FetchPeopleReducer from "./FetchPeopleReducer";

const reducer = combineReducers({
    usersData: usersReducer,
    singleUser: SingleUserReducer,
    tokenState: LogInReducer,
    peopleList: FetchPeopleReducer
});

export default reducer;