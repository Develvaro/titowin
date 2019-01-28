import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileNav from "../components/profileNav";
import Spinner from 'react-spinner-material';

import {
    fetchUserEventBids
} from '../actions';

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

class MyBids extends Component {
  componentDidMount() {
    //console.log(this.props);
    this.props.fetchUserEventBids(this.props.user.uid)
    //this.props.location.pathnam
  }
  render() {
    const { profile, userEventBids } = this.props;
    return (
      <div>
      <Row>
        <Col md="3">       <ProfileNav selected="bids"/>  </Col>
        <Col md="9">
        {
            userEventBids ?
                userEventBids.map(eventBid => 
                    <p>{eventBid.eventID}</p>
                )
                :
                
                <div><Spinner size={40} spinnerColor={"#e91e63"} spinnerWidth={1} visible={true} /></div>
              }
        </Col>
      </Row>
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
    fetchUserEventBids: (userID) => dispatch(fetchUserEventBids(userID))
  });
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyBids);
