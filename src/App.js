import React, { Component } from 'react';

import {connect} from 'react-redux';
import './App.css';
import Bar from './components/bar';
import Home from './pages/home'; 
import Login from './components/login';
import Register from './components/register';
import Profile from './pages/profile';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { loginSuccess } from './actions';
import firebase from 'firebase';

class App extends Component {

componentDidMount(){
  firebase.auth().onAuthStateChanged(user => {
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
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          {/* <Route exact path="/profile" component={Profile} />
          <Route exact path="/admin" component={Admin} />
          <Route path="/admin/addEvent" component={AddEvent} />
          <Route path="/admin/editEvent/:id" component={EditEvent} />
          <Router path="/admin/users" component={ListUsers} />
          <Router path="/admin/user/:id" component={EditUser} />
          <Route path="/event/:id" component={EventDetail} /> */}
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginSuccess: (user) => dispatch(loginSuccess(user))
});

export default connect(null, mapDispatchToProps)(App);
