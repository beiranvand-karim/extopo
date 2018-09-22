import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import '../App.css';
import UserList from "../containers/UserList";
import SingleUser from "../containers/SingleUser";
import LogIn from '../containers/LogIn';

export class Switcher extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/log-in" component={LogIn}/>
                <Route path="/users" component={UserList}/>
                <Route path="/detail/:id" component={SingleUser}/>
            </Switch>
        )
    }
}

const Home = () => {
    return <div>
        <h1>this is home page</h1>
        <Link to="log-in">log in</Link>
    </div>
};



const App = () => (
    <Router>
        <Route component={Switcher}/>
    </Router>
);

export default App;
