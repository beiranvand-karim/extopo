import React, {Component, Fragment} from 'react'
import {checkLogInBegin, checkLogInError, checkLogInSuccess, handleErrors} from '../actions/LogInActions'
import {connect} from "react-redux"
import {Link} from "react-router-dom"

export class LogIn extends Component {

   checkOnLogin = (e) => {
      e.preventDefault();
      const {userName, passWord} = this.state;
      this.props.checkLogInBegin();
      fetch(`http://localhost:3002/log-in`, {
         method: "POST",
         headers: {
            "cache-control": "no-cache",
            "Content-Type": "application/json",
         },
         body: JSON.stringify({userName, passWord}),
      })
         // .then(this.props.handleErrors)
         .then(res => res.json())
         .then(json => {
            this.props.checkLogInSuccess(json.token);
            return json
         })
         .catch(error => this.props.checkLogInError(error));
   };

   state = {
      userName: '',
      passWord: ''
   };
   change = e => {
      this.setState({
         [e.target.name]: e.target.value
      })
   };

   render() {
      const {loggedIn, error} = this.props;
      if (error) {
         return <div>error: {error.message}</div>
      }

      if (loggedIn) {
         return <div>
            <h1>you are logged in...</h1>
            <Link to="/people-list">go to people list</Link>
         </div>
      }
      return (
         <Fragment>
            <form onSubmit={this.checkOnLogin.bind(this)}>
               <div>
                  <label htmlFor="userName">user name :</label>
                  <input
                     onChange={e => this.change(e)}
                     value={this.state.userName}
                     type="text" name="userName"/>
               </div>
               <div>
                  <label htmlFor="passWord">pass word: </label>
                  <input
                     onChange={e => this.change(e)}
                     value={this.state.passWord}
                     type="text" name="passWord"/>
               </div>
               <button type="submit">submit</button>
            </form>
         </Fragment>
      );
   }
}
const mapDispatchToProps = dispatch => ({
   checkLogInError: (error) => dispatch(checkLogInError(error)),
   checkLogInSuccess: (json) => dispatch(checkLogInSuccess(json)),
   checkLogInBegin: () => dispatch(checkLogInBegin()),
   handleErrors: (response) => dispatch(handleErrors(response))
});
const mapStateToProps = state => ({
   error: state.tokenState.error,
   loading: state.tokenState.loading,
   loggedIn: state.tokenState.loggedIn
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
