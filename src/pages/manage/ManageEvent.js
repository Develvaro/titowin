import React, {Component} from 'react';
import CardManage from '../../components/cardManage'; 
import Spinner from 'react-spinner-material';
import {Row, Col, Button} from 'reactstrap';
import { connect } from "react-redux";
import AddPrize from './AddPrize';
import ProfileNav from '../../components/profileNav';
import styled from "styled-components";
import {Table} from "reactstrap";
import {
    fetchEventDetail,
    fetchEventWinners,
    fetchEventPrizes,
    setEventWinners,
    setEventPaid,
    postEvent,
    postEventPrize,
    deleteEventPrize,

    setEventPrizes,
    postEventDrawWinners,
} from '../../actions';

var QRCode = require('qrcode.react');
 
const FlexRow = styled.div`
  display: flex; 
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding:5px; 
  min-width: 0px;

`;

const FlexItem = styled.div`
    flex: ${props => props.flex};
    min-width: 31%;
    width: 200px; 
    height: 400px;
    margin:5px; 
    @media (max-width: 700px) {
        min-width: 33.33%; 
    }
`;

const BlankSpace = styled.div`
    margin-top: 10px;
`;

class ManageEvent extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
            disabled : false,        
        }
      }
    handleEventWinners = event => {
        this.setState({
            disabled : true,
        })
         this.props.setEventWinners(this.props.match.params.id);
    };

    handleDraw = () =>{
        this.props.postEventDrawWinners(this.props.match.params.id);
    };

    handlePay = event => {
        this.props.setEventPaid(this.props.match.params.id)
    };

    handleDeleteEventPrize = (idPrize) => {
        this.props.deleteEventPrize(this.props.match.params.id, idPrize)
    }

    handlePostPrize = (values) =>{
        this.props.postEventPrize(values)
    }

    handleSetPrizes = () => {
        console.log("Entro");
        this.props.setEventPrizes(this.props.match.params.id)
    }

    createTable = () => {
        let table = []
        const {eventWinners, eventDetail} = this.props;
        // Outer loop to create parent
        let header = [];
        
        header.push(<td>Usuario</td>);
        header.push(<td>Cantidad</td>);
        header.push(<td>Puesto</td>);
        table.push(<tr>{header}</tr>);
        for (let i = 0; i <= eventDetail.participaciones; i++) {
          let children = []
          //Inner loop to create children 
            children.push(<td>{eventWinners[i].email}</td>);
            children.push(<td>{eventWinners[i].cantidad}</td>);
            children.push(<td>{i + 1}</td>);

          //Create the parent and add the children
          table.push(<tr>{children}</tr>)
        }
        return table
      }
    
      createPrizeTable = () => {
        let table = []
        const {eventPrizes} = this.props;
        console.log(eventPrizes[0])
        console.log(eventPrizes.length)
        // Outer loop to create parent
        let header = [];
        
        header.push(<td>Premio</td>);
        header.push(<td>Precio</td>);
        header.push(<td>Descripción</td>)
        header.push(<td>Lugar recogida</td>)
        header.push(<td>Quitar Premio</td>)
        table.push(<tr>{header}</tr>);
        for (let i = 0; i < eventPrizes.length; i++) {
          let children = []
          //Inner loop to create children 
            children.push(<td>{eventPrizes[i].prizeName}</td>);
            children.push(<td>{eventPrizes[i].prizePrice}</td>);

            children.push(<td>{eventPrizes[i].prizeDescription}</td>);
            children.push(<td>{eventPrizes[i].prizePickPlace}</td>);
            children.push(<td><Button onClick={() => this.handleDeleteEventPrize(eventPrizes[i].id)}>Eliminar</Button></td>)
          //Create the parent and add the children
          table.push(<tr>{children}</tr>)
        }
        return table
      }

    componentDidMount(){
        const {id} = this.props.match.params
        this.props.fetchEventDetail(id);
        this.props.fetchEventPrizes(id);
    }

    componentDidUpdate(prevProps){
        const {eventDetail} = this.props;
        if(!prevProps.eventDetail && eventDetail){
            this.props.fetchEventWinners(this.props.match.params.id, eventDetail.participaciones);
        }
    }
    render(){

        const { eventDetail, eventWinners } = this.props;

        if (!eventDetail) {
            return         <Row>
            <Col md="4"><span></span></Col>
            <Col md="4"><p align="center"><Spinner size={40} spinnerColor={"#e91e63"} spinnerWidth={1} visible={true} /></p></Col>
            <Col md="4"><span></span></Col>
          </Row>;
          }

        else{

            const {estado} = eventDetail;

            let boton = "";
            

            switch(estado){
                case "abierto":
                    boton = (<Button onClick={this.handleEventWinners} disabled={this.state.disabled}>Finalizar Puja</Button>);
                    break;
                case "pendingpay":
                    boton = (<Button onClick={this.handlePay}>Pagos Realizados</Button>);
                    break;
                case "pendingprize":
                    boton = (<Button onClick={this.handleSetPrizes}> Confirmar premios </Button>)
                    break;
                case "pendingdraw":
                boton = (<Button onClick={this.handleDraw}>Realizar Sorteo</Button>);
                    break;
                case "finished":
                boton = "";
                    break;
                default:
                boton = "";
            }
            return(
                <div>   
                         
                    <Row>

                    <Col md="3">       <ProfileNav selected="myevents"/>  </Col>
                    <Col md="9">
                    <FlexRow>
                        <FlexItem flex="1">
                            <QRCode size="128" renderAs="canvas" value={eventDetail.id} />
                        </FlexItem>

                        <FlexItem flex="1">
                            <CardManage {...eventDetail} key={eventDetail.id} />
                        </FlexItem>


                    </FlexRow>
                    <BlankSpace/>


                    <Row><Col md="12">{estado == "pendingprize" ?  <AddPrize onSubmit={this.handlePostPrize} /> : ""}</Col></Row>

                    <FlexItem flex="1">
                            {eventWinners ? <div><h1>Ganadores</h1><Table> {this.createTable()}</Table></div>: <p align="center"><Spinner size={40} spinnerColor={"#e91e63"} spinnerWidth={1} visible={true} /></p> }

                            {(estado == "pendingprize" && this.props.eventPrizes )? <div> <h1>Premios</h1><Table>{this.createPrizeTable()}</Table> </div>: ""}
                            {boton}

                    </FlexItem>
                    
                        <br/>

                    </Col>
                    </Row>
                </div>
            )
        }

    }
}

const mapStateToProps = state => ({
    user: state.user,
    eventDetail: state.eventDetail,
    eventWinners: state.eventWinners,
    loading: state.loading,
    eventPrizes: state.eventPrizes,
  });
  
  const mapDispatchToProps = dispatch => ({
      fetchEventDetail: (id) => dispatch(fetchEventDetail(id)),
      fetchEventWinners: (id, ganadores) => (dispatch(fetchEventWinners(id,ganadores))),
      fetchEventPrizes: (id) => (dispatch(fetchEventPrizes(id))),
      setEventWinners: (id) => (dispatch(setEventWinners(id))),
      setEventPaid: (id) => (dispatch(setEventPaid(id))),
      postEventPrize: (data) => (dispatch(postEventPrize(data))),
      deleteEventPrize: (eventID, idPrize) => (dispatch(deleteEventPrize(eventID, idPrize))),
      setEventPrizes: (eventID) => (dispatch(setEventPrizes(eventID))),
      postEventDrawWinners: (eventID) => (dispatch(postEventDrawWinners(eventID))),
  });
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ManageEvent);
  