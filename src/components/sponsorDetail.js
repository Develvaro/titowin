import React, { Component } from "react";
import { connect } from "react-redux";
import {
    fetchSponsorDetail,
} from '../actions';

import SponsorCard from './sponsorCard';


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
        <SponsorCard  titulo = {this.props.sponsorDetail.texto} 
        url = {this.props.sponsorDetail.urlWeb} 
        urlPhoto = {this.props.sponsorDetail.urlPhoto}
          />
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
