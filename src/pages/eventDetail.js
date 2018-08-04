import React, { Component } from "react";
import { connect } from "react-redux";

import {
  fetchEventDetail,
  fetchPlace,
  fetchProfile,
  fetchEventBid,
} from '../actions';

class EventDetail extends Component {
    componentDidMount(){
      const idEvent = this.props.match.params.id;

      const { fetchEventBid, fetchEventDetail, fetchPlace } = this.props;
      fetchEventDetail(idEvent);
      fetchEventBid(idEvent);
      
    }
    render() {

      console.log(this.props.eventDetail);
    return (
      <div>
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
        
      </div>
    );
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
    fetchPlace: (idEvent) => dispatch(fetchPlace(idEvent)),
    fetchEventBid: (idEvent) => dispatch(fetchEventBid(idEvent)), 
});

export default connect (mapStateToProps, mapDispatchToProps)(EventDetail);
