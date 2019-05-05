import React, {Component} from 'react';
import CardManage from '../../components/cardManage'; 
import Spinner from 'react-spinner-material';
import {Row, Col, Button} from 'reactstrap';
import { connect } from "react-redux";
import ProfileNav from '../../components/profileNav';
import styled from "styled-components";
import {Table} from "reactstrap";
import {
    fetchEventDetail,
    fetchEventWinners,
    setEventWinners,
    setEventPaid,
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

    handleDraw = event =>{

    };

    handlePay = event => {
        this.props.setEventPaid(this.props.match.params.id)
    };

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

    componentDidMount(){
        const {id} = this.props.match.params
        this.props.fetchEventDetail(id);
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
                case "pendingdraw":
                boton = (<Button onClick={this.handleDraw}>Realizar Sorteo</Button>);
                    break;
                case "finished":
                boton = "";
                    break;
                default:
                boton = (<Button onClick={this.handleEventWinners} disabled={this.state.disabled}>Finalizar Puja</Button>);

                    ;
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

                    <FlexItem flex="1">
                            {eventWinners ? <Table> {this.createTable()}</Table>: <p align="center"><Spinner size={40} spinnerColor={"#e91e63"} spinnerWidth={1} visible={true} /></p> }
                            {boton}

                    </FlexItem>
                    <FlexItem>
                    </FlexItem>


                    {/*
                                        <Row>
                        <Col md="3" > 
                            <QRCode size="128" renderAs="canvas" value={eventDetail.id} />
                        </Col>
                        <Col md="3" >                        
                        <CardManage {...eventDetail} key={eventDetail.id} />
                        </Col>
                        <Col md="3" >                        {eventWinners ? this.createTable(): <p align="center"><Spinner size={40} spinnerColor={"#e91e63"} spinnerWidth={1} visible={true} /></p> }
                        </Col>
                    </Row>
                    */
                    }
                    
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
  });
  
  const mapDispatchToProps = dispatch => ({
      fetchEventDetail: (id) => dispatch(fetchEventDetail(id)),
      fetchEventWinners: (id, ganadores) => (dispatch(fetchEventWinners(id,ganadores))),
      setEventWinners: (id) => (dispatch(setEventWinners(id))),
      setEventPaid: (id) => (dispatch(setEventPaid(id))),
  });
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ManageEvent);
  