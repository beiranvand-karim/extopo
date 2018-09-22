import React from "react";
import {fetchSingleUser} from "../actions/SingleUserActions";
import {connect} from "react-redux";

class SingleUser extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchSingleUser(this.props.match.params.id));
    }
    render() {
        const {user, error, loading} = this.props;
        if (loading) {
            return <div>loading ...</div>
        }
        if (error) {
            return <div>an error occurred</div>
        }
        if (user) {
            return <div>
                <h1>id: {user.id}</h1>
                <h3>name: {user.name}</h3>
            </div>
        }
        return null;
    }
}

const mapStateToProps = state => ({
    user: state.singleUser.user,
    error: state.singleUser.error,
    loading: state.singleUser.loading
});

export default connect(mapStateToProps)(SingleUser);