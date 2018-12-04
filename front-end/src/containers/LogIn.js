import React from 'react';
import checkLogIn from '../actions/LogInActions';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class LogIn extends React.Component {

   checkOnLogin = (e) => {
      e.preventDefault();
      this.props.dispatch(checkLogIn(this.state.userName, this.state.passWord));
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
         <React.Fragment>
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
         </React.Fragment>
      );
   }
}

const mapStateToProps = state => ({
   error: state.tokenState.error,
   loading: state.tokenState.loading,
   loggedIn: state.tokenState.loggedIn
});

export default connect(mapStateToProps)(LogIn);
