import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import SingUp from "../actions/SignUpActions";

class SignUp extends React.Component {
    state = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      passWord: ''
    };
    formSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(SingUp(this.state));
        this.setState({firstName: ''});
        this.setState({lastName: ''});
        this.setState({userName: ''});
        this.setState({email: ''});
        this.setState({passWord: ''});
    };
    render() {
        const {loading, user} = this.props;
        if(loading) {
            return <div>loading ...</div>
        }

        if (user) {
            return <React.Fragment>
                <h1>user with follow up data registered ...</h1>
                <h3>first name: {user.firstName}</h3>
                <h3>last name: {user.lastName}</h3>
                <h3>email: {user.email}</h3>
                <h3>user name: {user.userName}</h3>
                <h3>pass word: {user.passWord}</h3>
                <br/>
                <Link to="/log-in">go to log in</Link>
            </React.Fragment>
        }

        return (
            <React.Fragment>
                <form onSubmit={this.formSubmit.bind(this)}>
                    <div>
                        <label htmlFor="first-name">first name: </label>
                        <input
                            onChange={e => this.setState({firstName: e.target.value})}
                            value={this.state.firstName} type="text" name="first-name"/>
                    </div>
                    <div>
                        <label htmlFor="last-name">last name: </label>
                        <input
                            onChange={e => this.setState({lastName: e.target.value})}
                            value={this.state.lastName} type="text" name="last-name"/>
                    </div>
                    <div>
                        <label htmlFor="user-name">user name: </label>
                        <input
                            onChange={e => this.setState({userName: e.target.value})}
                            value={this.state.userName} type="text" name="user-name"/>
                    </div>
                    <div>
                        <label htmlFor="pass-word">pass word: </label>
                        <input
                            onChange={e => this.setState({passWord: e.target.value})}
                            value={this.state.passWord} type="password" name="pass-word"/>
                    </div>
                    <div>
                        <label htmlFor="email">email: </label>
                        <input
                            onChange={e => this.setState({email: e.target.value})}
                            value={this.state.email} type="email" name="email"/>
                    </div>
                    <button type="submit">submit</button>
                </form>
                <br/>
                <Link to="/">got to home</Link>
                <br/>
                <Link to="/log-in">go to log in</Link>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.signUpUser.user,
    error: state.signUpUser.error,
    loading: state.signUpUser.loading
});

export default connect(mapStateToProps)(SignUp);