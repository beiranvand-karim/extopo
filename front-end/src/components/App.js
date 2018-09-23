import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import '../App.css';
import UserList from "../containers/UserList";
import SingleUser from "../containers/SingleUser";
import LogIn from '../containers/LogIn';
import PeopleList from "../containers/PeopleList";
import Home from "./Home";
import PersonDetail from "../containers/PersonDetail";
import SignUp from "../containers/SignUp";

export class Switcher extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/log-in" component={LogIn}/>
                <Route path="/sign-up" component={SignUp}/>
                <Route path="/users" component={UserList}/>
                <Route path="/detail/:id" component={SingleUser}/>
                <Route path="/people-list" component={PeopleList}/>
                <Route path="/person-detail/:id" component={PersonDetail}/>
            </Switch>
        )
    }
}

const App = () => (
    <Router>
        <Route component={Switcher}/>
    </Router>
);

export default App;
