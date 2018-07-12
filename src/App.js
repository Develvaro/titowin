import React, { Component } from 'react';

import {connect} from 'react-redux';
import './App.css';
import Bar from './components/bar';
import Home from './components/home'; 
import Login from './components/login';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { loginSuccess } from './actions';
import firebase from 'firebase';

class App extends Component {

componentDidMount(){
  firebase.auth().onAuthStateChanged(user => {
    console.log(user);
    if(user){
      this.props.loginSuccess(user);
    }
  })
}

  render() {
    return (
      <Router>
        <div className="App">
          <Bar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginSuccess: (user) => dispatch(loginSuccess(user))
});

export default connect(null, mapDispatchToProps)(App);
