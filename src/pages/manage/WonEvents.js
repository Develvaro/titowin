import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileNav from "../../components/profileNav";
import {
    fetchWonEvents,
} from '../../actions';

import CardCompany from '../../components/cardCompany';
import Spinner from 'react-spinner-material';
import styled from 'styled-components';


import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import TextInput from "../../components/form/textinput";
import {Field} from "redux-form";


const FlexList = styled.div`
  display: flex; 
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding:5px; 

`;
class WonEvents extends Component {
  componentDidMount() {
    this.props.fetchWonEvents(this.props.user.uid)
  }
  render() {
    const {  fetchWonEvents, events } = this.props;
    console.log(events);
    if (!events) {
      return         <Row>
      <Col md="4"><span></span></Col>
      <Col md="4"><p align="center"><Spinner size={40} spinnerColor={"#e91e63"} spinnerWidth={1} visible={true} /></p></Col>
      <Col md="4"><span></span></Col>
    </Row>;
    }

    return(
            <div>
            <Row>
            <Col md="3">       <ProfileNav selected="wonevents"/>  </Col>
            <Col md="9">


            <FlexList>
            {
                 events.map(event =>
                ( <div><p>{event.ticket}</p><CardCompany {...event} key={event.id} /> </div>) 
                    )
                
            }
        </FlexList>            </Col>
            </Row>
            </div>        
            )
  }
}
const mapStateToProps = state => ({
  user: state.user,
  events: state.events,
});

const mapDispatchToProps = dispatch => ({
    fetchWonEvents: (userID) => dispatch(fetchWonEvents(userID))
  });
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WonEvents);
