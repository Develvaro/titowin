import React, { Component } from "react";

import { connect } from "react-redux";
import "./App.css";
import Bar from "./components/bar";
import Home from "./pages/home";
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./pages/manage/profile";
import MyBids from "./pages/manage/myBids";
import ManageUsers from "./pages/manage/manageUsers";
import SponsorDetail from "./pages/sponsorDetail";
import MySponsors from "./pages/manage/mySponsors";
import AddEvent from "./components/addEvent";
import ValidateCompanies from "./components/validateCompanies"
import ValidateMe from "./components/validateMe"
import EventDetail from "./pages/eventDetail";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { loginSuccess, fetchProfile } from "./actions";
import firebase from "firebase";
import SuccessPopup from "./components/successPopup";
import ErrorPopup from "./components/errorPopup";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import validateMe from "./components/validateMe";
import ListValidateUsers from "./components/listValidateUsers";
import ValidateCompanyDetail from "./pages/manage/validateCompanyDetail"

class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.loginSuccess(user);
        this.props.fetchProfile(user);
      }
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <SuccessPopup />
          <ErrorPopup />
          <Bar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={this.props.user && Profile} />
          <Route
            exact
            path="/profile/bids"
            component={this.props.user && MyBids}
          />
          <Route
            exact
            path="/profile/sponsors"
            component={this.props.user && MySponsors}
          />
          <Route
            path="/profile/sponsors/:id"
            component={this.props.user && SponsorDetail}
          />
          <Route path="/manage/addEvent" component={AddEvent} />
          <Route exact path="/admin/users/" component={ManageUsers} />

          <Route path="/event/:id" component={EventDetail} />
          <Route path="/validateme" component={ValidateMe} />
          <Route exact path="/admin/users/listvalidate" component={this.props.user && ListValidateUsers} />
          <Route path="/admin/users/validatecompany/:id" component={ValidateCompanyDetail}/>
          
          {/* <Route exact path="/profile" component={Profile} />
          <Route exact path="/admin" component={Admin} />
          <Route path="/admin/editEvent/:id" component={EditEvent} />
          <Router path="/admin/users" component={ListUsers} />
          <Router path="/admin/user/:id" component={EditUser} />
           */}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  loginSuccess: user => dispatch(loginSuccess(user)),
  fetchProfile: user => dispatch(fetchProfile(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
