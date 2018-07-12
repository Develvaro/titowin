import React, {Component} from 'react';
import firebase from 'firebase';

onSubmit = (event) => {
    const {
        username,
        email,
        passwordOne,
      } = this.state;
  
      const {
        history,
      } = this.props;

      auth.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          this.setState(() => ({ ...INITIAL_STATE }));
          history.push(routes.HOME);
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });
  
      event.preventDefault();
}

class RegisterForm extends Component {
    return(){
        render(
        <form onSubmit={this.onSubmit}>
            <input
              value={username}
              onChange={event => this.setState(byPropKey('username', event.target.value))}
              type="text"
              placeholder="Full Name"
            />
            <input
              value={email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              type="text"
              placeholder="Email Address"
            />
            <input
              value={passwordOne}
              onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
              type="password"
              placeholder="Password"
            />
            <input
              value={passwordTwo}
              onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
              type="password"
              placeholder="Confirm Password"
            />
            <button disabled={isInvalid} type="submit">
              Sign Up
            </button>
    
            { error && <p>{error.message}</p> }
        </form>
        )};
}

export default RegisterForm;