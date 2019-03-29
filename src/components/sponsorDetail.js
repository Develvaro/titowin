import React, { Component } from "react";
import { connect } from "react-redux";
import {
    fetchSponsorDetail,
} from '../actions';


class SponsorDetail extends Component {


    componentDidMount(){
        console.log(this.props);
      const idSponsor = this.props.id;

      this.props.fetchSponsorDetail(idSponsor);
      //fetchEventBid(idEvent);
    }


    render() {

    return (
      <div>    
        {
        this.props.sponsorDetail ?
        <div>
            <p>{this.props.sponsorDetail.texto}</p>
            <br />
            <img src={this.props.sponsorDetail.urlPhoto} />
            <br />
            <a href={this.props.sponsorDetail.urlWeb}>Web</a>
        </div>
        :
        <p>Cargando...</p> 
        
        }
        
      </div>
    );
  }
}



const mapStateToProps = (state) => ({
    sponsorDetail: state.sponsorDetail,
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    fetchSponsorDetail: (idSponsor) => dispatch(fetchSponsorDetail(idSponsor)),
});

export default connect (mapStateToProps, mapDispatchToProps)(SponsorDetail);
