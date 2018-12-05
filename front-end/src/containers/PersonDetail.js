import React, {Component} from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {
   fetchPersonBegin,
   fetchPersonError,
   fetchPersonSuccess,
   handleErrors
} from "../actions/FetchPersonDetailActions"


export class PersonDetail extends Component {
   componentDidMount() {
      this.props.fetchPersonBegin();
      fetch(`http://127.0.0.1:3002/people/${this.props.match.params.id}`, {
         method: "GET",
         headers: {
            "cache-control": "no-cache",
            "Content-Type": "application/json",
            "Authorization": "bearer " + this.props.token,
         }
      })
         .then(this.props.handleErrors)
         .then(res => res.json())
         .then(json => {
            this.props.fetchPersonSuccess(json);
            return json
         })
         .catch(error => this.props.fetchPersonError(error));
   }

   render() {
      const {error, loading, person} = this.props;
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

const mapDispatchToProps = dispatch => ({
   fetchPersonError: (error) => dispatch(fetchPersonError(error)),
   fetchPersonSuccess: (json) => dispatch(fetchPersonSuccess(json)),
   fetchPersonBegin: () => dispatch(fetchPersonBegin()),
   handleErrors: (response) => dispatch(handleErrors(response))
});
const mapStateToProps = state => ({
   token: state.tokenState.token,
   person: state.personDetail.person,
   loading: state.personDetail.loading,
   error: state.personDetail.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetail);
