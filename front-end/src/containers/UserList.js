import React from "react";
import {connect} from "react-redux";
import {fetchUsers} from "../actions/UserActions";
import {Link} from "react-router-dom";


class UserList extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchUsers());
    }
    render() {
        const { error ,loading, users } = this.props;
        if (error) {
            return <div>Error! {error.message}</div>;
        }
        if (loading) {
            return <div>Loading...</div>;
        }
        if (users.length > 0) {
            return (
                <ul>
                    {users.map((user) =>
                        <li key={user.id}>
                            <Link to={`/detail/${user.id}`}>{user.id} - {user.name}</Link>
                        </li>
                    )}
                </ul>
            );
        }
        return null;
    }
}

const mapStateToProps = state => ({
    users: state.usersData.users,
    loading: state.usersData.loading,
    error: state.usersData.error
});

export default connect(mapStateToProps)(UserList);