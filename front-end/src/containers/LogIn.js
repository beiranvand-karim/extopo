import React from 'react';
import checkLogIn from '../actions/LogInActions';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class LogIn extends React.Component {
    checkOnLogin = () => {
        this.props.dispatch(checkLogIn('user', 'pwd'));
    };
    redirectToTarget = () => {
        this.props.history.push(`/people-list`);
    };
    render() {
        const {loggedIn} = this.props;
        if (loggedIn) {
            return <div>
                <h1>you are logged in...</h1>
                <Link to="/people-list">go to people list</Link>
            </div>
        }
        return (
            <div>
                <h1>this is LogIn page</h1>
                <button onClick={this.checkOnLogin}>check log in</button>
                <button onClick={this.redirectToTarget}>go to people</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.singleUser.user,
    error: state.singleUser.error,
    loading: state.singleUser.loading,
    loggedIn: state.tokenState.loggedIn
});

export default connect(mapStateToProps)(LogIn);
