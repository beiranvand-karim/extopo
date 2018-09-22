import React from "react";
import {connect} from "react-redux";
import fetchPeople from "../actions/FetchPeopleActions";
import {Link} from "react-router-dom";


class PeopleList extends React.Component {
    componentDidMount() {
        console.log(this.props.token);
        this.props.dispatch(fetchPeople(this.props.token));
    }
    render() {
        const { error ,loading, people } = this.props;
        console.log(this.props.people);
        if (error) {
            return <div>Error! {error.message}</div>;
        }
        if (loading) {
            return <div>Loading...</div>;
        }
        if (people) {
            return (
                <ul>
                    {people.map((person) =>
                        <li key={person._id}>
                            <Link to={`/detail/${person._id}`}>{person._id} - {person.name} - {person.email}</Link>
                        </li>
                    )}
                </ul>
            );
        }
        return null;
    }
}

const mapStateToProps = state => ({
    token: state.tokenState.token,
    loading: state.peopleList.loading,
    error: state.peopleList.error,
    people: state.peopleList.people
});

export default connect(mapStateToProps)(PeopleList);