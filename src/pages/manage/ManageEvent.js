import React, {Component} from 'react';
import CardManage from '../../components/cardManage'; 
import Spinner from 'react-spinner-material';
import {Row, Col, Button} from 'reactstrap';
import { connect } from "react-redux";
import ProfileNav from '../../components/profileNav';
 
import {
    fetchEventDetail,
    fetchEventWinners,
    setEventWinners,
} from '../../actions';


class ManageEvent extends Component{

    handleEventWinners = event => {
        this.props.setEventWinners(this.props.match.params.id);
    };

    handleDraw = event =>{

    };

    handlePay = event => {

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
                boton = (<Button onClick={this.handleEventWinners}>Finalizar Puja</Button>);
                    break;
                case "bidfinished":
                boton = (<Button onClick={this.handlePay}>Pagos Realizados</Button>);
                    break;
                case "paid":
                boton = (<Button onClick={this.handleDraw}>Realizar Sorteo</Button>);
                    break;
                case "finished":
                boton = "";
                    break;
                default:
                    "";
            }
            return(
                <div>            
                    <Row>
                    <Col md="3">       <ProfileNav selected="myevents"/>  </Col>
                    <Col md="9">
                        <CardManage {...eventDetail} key={eventDetail.id} />
                        <br/>
                        {eventWinners ? this.createTable(): <p align="center"><Spinner size={40} spinnerColor={"#e91e63"} spinnerWidth={1} visible={true} /></p> }
                        {boton}
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
  });
  
  const mapDispatchToProps = dispatch => ({
      fetchEventDetail: (id) => dispatch(fetchEventDetail(id)),
      fetchEventWinners: (id, ganadores) => (dispatch(fetchEventWinners(id,ganadores))),
      setEventWinners: (id) => (dispatch(setEventWinners(id))),
  });
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ManageEvent);
  