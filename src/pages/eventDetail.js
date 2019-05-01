import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchEventDetail,
  fetchPlace,
  fetchProfile,
  fetchEventBid,
} from '../actions';
import styled from "styled-components";

import {Row, Col} from 'reactstrap';

import Spinner from 'react-spinner-material';

import DetailBid from '../components/detailBid';
import DetailTab from '../components/detailTab';
import DetailBidEvent from "../components/detailBidEvent";

const FlexList = styled.div`
  display: flex; 
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding:5px; 

`;
class EventDetail extends Component {


    componentDidMount(){
      const idEvent = this.props.match.params.id;
      const { fetchEventBid, fetchEventDetail, fetchPlace } = this.props;
      fetchEventDetail(idEvent);
      //fetchEventBid(idEvent);
      
    }


    render() {

      console.log(this.props.eventDetail);

      const {eventDetail} = this.props;

      if(!eventDetail){
        return(
          <p align="center"><Spinner size={40} spinnerColor={"#e91e63"} spinnerWidth={1} visible={true} /></p>                 
        );
      }
      else{
    return (

        <FlexList>
          
          <DetailBidEvent />

          <DetailTab />

          <DetailBid />

          {

            

            /*

            <Col sm="4">Hola</Col>
            <Col sm="4">Hola</Col>

            {//<Col sm="8">{this.props.eventDetail ? <DetailTab /> : "Cargando..."}</Col> 
            }
            <Col sm="4" >{this.props.eventDetail ? <DetailBid /> : "Cargando..."}</Col>


          {
            this.props.profile ?
              <p> {this.props.profile.id} </p>
              : <p> Cargando... </p>   
          }
          {
            this.props.eventBids ?
              <p> EventBids </p>
              : <p> Cargando... </p>
          }
          {
            this.props.eventDetail ?
              <div>
                <p> {this.props.eventDetail.titulo}</p>
                <p> {this.props.eventDetail.categoria}</p>
                <p> {this.props.eventDetail.place.nombre}</p>
                <p> {this.props.eventDetail.titulo}</p>
              </div>
              : <p> Cargando... </p>
          }
          
            */
          }
              </FlexList>
            

      );
      }
  }
}



const mapStateToProps = (state) => ({
    eventDetail: state.eventDetail,
    place: state.place,
    profile: state.profile,
    eventBids: state.eventBids,
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    fetchEventDetail: (idEvent) => dispatch(fetchEventDetail(idEvent)),

});

export default connect (mapStateToProps, mapDispatchToProps)(EventDetail);
