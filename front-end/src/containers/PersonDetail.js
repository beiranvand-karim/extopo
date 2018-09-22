import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import fetchPerson from "../actions/FetchPersonDetailActions";


class PersonDetail extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchPerson(this.props.token, this.props.match.params.id));
    }
    render() {
        const { error ,loading, person } = this.props;
        if (error) {
            return <div>
                <div>Error! {error.message}</div>
                <Link to="/people-list">go to people list</Link>
            </div>
        }
        if (loading) {
            return <div>Loading...</div>;
        }
        if (person) {
            return (
                <div>
                    <h1>id: {person._id}</h1>
                    <h1>name: {person.name}</h1>
                    <h1>email: {person.email}</h1>
                </div>
            );
        }
        return null;
    }
}

const mapStateToProps = state => ({
    token: state.tokenState.token,
    person: state.personDetail.person,
    loading: state.personDetail.loading,
    error: state.personDetail.error,
});

export default connect(mapStateToProps)(PersonDetail);