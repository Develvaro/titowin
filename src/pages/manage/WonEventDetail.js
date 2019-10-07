import React, {Component} from 'react';
import CardCompany from '../../components/cardCompany';
import { connect } from "react-redux";
import {Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import SponsorCard from '../../components/sponsorCard';
import styled from 'styled-components';

import ProfileNav from '../../components/profileNav';

import {
    fetchWonEventDetail,
    fetchValidatedSponsors,
    postEventSponsor,
} from '../../actions';

const Container = styled.div`
 display: flex;
    flex-direction: row;
    justify-content: center;
`;

const FlexList = styled.div`
  display: flex; 
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding:5px; 

`;

class WonEventDetail extends Component{

    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          sponsor: null,
        };
    
        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
      }
      
      close(){
        this.setState(prevState => ({
            modal: !prevState.modal,
            sponsor: null,
        }));
      }
      toggle(sponsor) {
        this.setState(prevState => ({
          modal: !prevState.modal,
          sponsor: sponsor,
        }));
    }

    handlePostEvent = (sponsorID) => {
        this.props.postEventSponsor(this.props.ticket.id,this.props.eventDetail.id, sponsorID);
        this.close()
    }

    handleSelect = (idSponsor) => {
        this.setState((prevState) => {
            console.log(idSponsor);
            return {...prevState,
                idSponsor: idSponsor,
            }
          })
    }

    componentDidMount(){
        const ticketID = this.props.match.params.id;
        this.props.fetchWonEventDetail(ticketID);
    }

    componentDidUpdate(prevProps){
        if(!prevProps.ticket && this.props.ticket){            
            if(!this.props.ticket.hasSponsor)
            {
                this.props.fetchValidatedSponsors();
            }
        }
        if(prevProps.success != this.props.success && this.props.success.type == "postEventSponsor"){
            window.location.reload();
        }
    }


    render(){
        const {eventDetail, ticket, listSponsors, user } = this.props;
        if(eventDetail && ticket){
            console.log(eventDetail);
            return(

                <Row>
                <Col md="3">       <ProfileNav selected="wonevents"/>  </Col>
                <Col md="9">
                <div>
                <Modal isOpen={this.state.modal} fade={false} toggle={this.close} className={this.props.className}>
                <ModalHeader toggle={this.close}>Seleccionar Sponsor</ModalHeader>
                <ModalBody>
                    ¿Quieres anunciar el anuncio {this.state.sponsor ? this.state.sponsor.texto : ""} en el evento?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handlePostEvent(this.state.sponsor.id)}>Anunciar</Button>{' '}
                    <Button color="secondary" onClick={this.close}>Cancelar</Button>
                </ModalFooter>
                </Modal>
                
                

                <Container>
                    <CardCompany {...eventDetail} id={null}/>
                </Container>

                {eventDetail.pagado ? <div>Su pago ha sido procesado correctamente, próximamente su anuncio aparecerá en el evento. Muchas gracias.</div> :
                    <div>
                        Enhorabuena, has ganado este evento, para que los asistentes puedan ver tu Sponsor debes abonar {ticket.cantidad} €  en la cuenta " xxxxx " con el concepto {user.email}.
                        <br/>
                        El administrador del lugar pondrá tu Sponsor visible a los asistentes al evento.
                    </div>
                }
                {ticket.hasSponsor ? "" : 
                <div>
                <FlexList>
                    {
                        listSponsors ?
                            listSponsors.map(sponsor => 
                            (
                                <div>
                            <SponsorCard id={sponsor.id}
                            titulo = {sponsor.texto} 
                            url = {sponsor.urlWeb} 
                            urlPhoto = {sponsor.urlPhoto}
                            validado = {sponsor.validado}
                            /> <Button onClick={() => this.toggle(sponsor) }>Seleccionar</Button></div>)
                            )
                            :
                            <p>Cargando tus sponsors.</p>
                    }
                </FlexList>
                </div>
                }
                </div>
                </Col>
                </Row>
                
            )
        }
        else{
            return(
                <div>Cargando</div>
            )
        }

        }
}

const mapStateToProps = state => ({
    user: state.user,
    eventDetail: state.eventDetail,
    ticket: state.ticket,
    listSponsors: state.listSponsors,
    success: state.success,
  });
  
  const mapDispatchToProps = dispatch => ({
      fetchWonEventDetail: (ticket) => dispatch(fetchWonEventDetail(ticket)),
      fetchValidatedSponsors: () => dispatch(fetchValidatedSponsors()),
      postEventSponsor: (ticket, idEvent, idSponsor) => dispatch(postEventSponsor(ticket, idEvent, idSponsor))
  });
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(WonEventDetail);
  