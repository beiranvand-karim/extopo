import React from "react"
import {connect} from "react-redux"
import {
   fetchPeopleBegin,
   fetchPeopleError,
   fetchPeopleSuccess,
   handleErrors
} from "../actions/FetchPeopleActions"
import {Link} from "react-router-dom"


export class PeopleList extends React.Component {
   componentDidMount() {
      this.props.fetchPeopleBegin();
      fetch(`http://127.0.0.1:3002/people`, {
         method: "GET",
         headers: {
            "cache-control": "no-cache",
            "Content-Type": "application/json",
            "Authorization": "bearer " + this.props.token,
         }
      })
         // .then(this.props.handleErrors)
         .then(res => res.json())
         .then(json => {
            this.props.fetchPeopleSuccess(json);
            return json
         })
         .catch(error => this.props.fetchPeopleError(error));
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

const mapDispatchToProps = dispatch => ({
   fetchPeopleError: (error) => dispatch(fetchPeopleError(error)),
   fetchPeopleSuccess: (json) => dispatch(fetchPeopleSuccess(json)),
   fetchPeopleBegin: () => dispatch(fetchPeopleBegin()),
   handleErrors: (response) => dispatch(handleErrors(response))
});

const mapStateToProps = state => ({
   token: state.tokenState.token,
   loading: state.peopleList.loading,
   error: state.peopleList.error,
   people: state.peopleList.people
});

export default connect(mapStateToProps, mapDispatchToProps)(PeopleList);
