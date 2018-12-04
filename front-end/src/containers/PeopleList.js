import React from "react";
import {connect} from "react-redux";
import fetchPeople from "../actions/FetchPeopleActions";
import {Link} from "react-router-dom";


class PeopleList extends React.Component {
   componentDidMount() {
      this.props.dispatch(fetchPeople(this.props.token));
   }

   render() {
      const {error, loading, people} = this.props;
      if (error) {
         return <div>
            <div>Error! {error.message}</div>
            <Link to="/log-in">go to login page</Link>
         </div>
      }
      if (loading) {
         return <div>Loading...</div>;
      }
      if (people && people.length > 0) {
         return (
            <ul>
               {people.map((person) =>
                  <li key={person._id}>
                     <Link to={`/person-detail/${person._id}`}>{person._id} - {person.name} - {person.email}</Link>
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
