import React from 'react';
import checkLogIn from '../actions/LogInActions';
import {connect} from "react-redux";

class LogIn extends React.Component {
    checkOnLogin = () => {
        this.props.dispatch(checkLogIn('user', 'pwd'));
    };
    redirectToTarget = () => {
        this.props.history.push(`/people-list`);
    };
    render() {
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
    loading: state.singleUser.loading
});

export default connect(mapStateToProps)(LogIn);
