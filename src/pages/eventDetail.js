import React, { Component } from "react";
import { connect } from "react-redux";

class EventDetail extends Component {
    componentDidMount(){

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

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect (mapStateToProps, mapDispatchToProps)(EventDetail);
