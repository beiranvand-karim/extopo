import {combineReducers} from "redux";
import SingleUserReducer from "./SingleUserReducer";
import usersReducer from "./UsersReducer";
import LogInReducer from "./LogInReducer";
import FetchPeopleReducer from "./FetchPeopleReducer";
import PersonDetailReducer from "./PersonDetailReducer";
import SignUpReducer from "./SignUpReducer";

const reducer = combineReducers({
    usersData: usersReducer,
    singleUser: SingleUserReducer,
    tokenState: LogInReducer,
    peopleList: FetchPeopleReducer,
    personDetail: PersonDetailReducer,
    signUpUser: SignUpReducer
});

export default reducer;