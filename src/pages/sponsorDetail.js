import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileNav from "../components/profileNav";

import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import TextInput from "../components/form/textinput";
import {Field} from "redux-form";

class SponsorDetail extends Component {
  componentDidMount() {
    //console.log(this.props);
    //this.props.location.pathname
  }
  render() {
    return (
      <div>
        <ProfileNav/>

      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile,
  userEventBids: state.userEventBids,
});

const mapDispatchToProps = dispatch => ({

});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SponsorDetail);
