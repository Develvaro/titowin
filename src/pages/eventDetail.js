import React, { Component } from "react";
import { connect } from "react-redux";

import {
  fetchEventDetail,
  fetchEventPlace,
  fetchProfile,
  fetchEventBid,
} from '../actions';

class EventDetail extends Component {
    componentDidMount(){
      const idEvent = this.props.match.params.id;
      const { fetchEventBid, fetchEventDetail, fetchEventPlace, fetchProfile } = this.props;
      fetchEventDetail(idEvent);
      fetchEventBid(idEvent);
      fetchProfile(this.props.user);
      fetchEventPlace(idEvent);

      console.log(this.props.eventDetail);
    }
    render() {
    return (
      <div>

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
    fetchEventPlace: (idEvent) => dispatch(fetchEventPlace(idEvent)),
    fetchProfile: () => dispatch(fetchProfile()),
    fetchEventBid: (idEvent) => dispatch(fetchEventBid(idEvent)), 
});

export default connect (mapStateToProps, mapDispatchToProps)(EventDetail);
