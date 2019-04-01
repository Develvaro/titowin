import React, {Component} from 'react';
import {Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import ProfileNav from '../../components/profileNav';
import SponsorCard from '../../components/sponsorCard';
import { connect } from "react-redux";
import Spinner from 'react-spinner-material';


import {
    fetchSponsorDetail,
    deleteSponsor,
}
from '../../actions'

class SponsorDetailPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    handleDelete = event => {
        this.props.deleteSponsor(this.props.match.params.id);
    };

    componentDidMount(){

        this.props.fetchSponsorDetail(this.props.match.params.id);
        //fetchEventBid(idEvent);
    }

    render(){
        const idSponsor = this.props.match.params.id;
        const {deleteSponsor } = this.props;
        return(
            <div>
        <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Borrar Sponsor</ModalHeader>
          <ModalBody>
            Estás a punto de eliminar tu anuncio, ¿estás seguro?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleDelete}>Eliminar</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
          </ModalFooter>
        </Modal>
            <Row>
            <Col md="3">       <ProfileNav selected="sponsordetail"/>  </Col>
            <Col md="3"> <span></span></Col>
            <Col md="3">
            {
        this.props.sponsorDetail ?
        <div>
        <SponsorCard  titulo = {this.props.sponsorDetail.texto} 
        url = {this.props.sponsorDetail.urlWeb} 
        urlPhoto = {this.props.sponsorDetail.urlPhoto}
        validado = {this.props.sponsorDetail.validado}
          />
          {!this.props.sponsorDetail.validado ? <Button onClick={this.toggle}>Eliminar</Button> : ""}
          
        </div>

        :
        <p align="center"><Spinner size={40} spinnerColor={"#e91e63"} spinnerWidth={1} visible={true} /></p>                 

        }

            </Col>
            </Row>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    sponsorDetail: state.sponsorDetail,
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    fetchSponsorDetail: (idSponsor) => dispatch(fetchSponsorDetail(idSponsor)),
    deleteSponsor: (idSponsor) => dispatch(deleteSponsor(idSponsor)),
});

export default connect (mapStateToProps, mapDispatchToProps)(SponsorDetailPage);