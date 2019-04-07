import React, {Component} from 'react';
import ProfileNav from '../../components/profileNav';
import {Row, Col, Button} from 'reactstrap';
import Card from '../../components/card'
import Spinner from 'react-spinner-material';

import {
    fetchEventDetail,
    fetchEventWinners,
    setEventWinners,
} from '../../actions';
class FinishEvent extends Component{

    handleFinish = event => {
        this.props.setEventWinners(this.props.match.params.id);
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
        this.props.fetchEventDetail(this.props.match.params.id);
    }

    componentDidUpdate(prevProps){
        if(!prevProps.eventDetail && this.props.eventDetail)
        {
            this.props.fetchEventWinners(this.props.match.params.id,eventDetail.participaciones);
        }
    }
    
    render(){
        const {eventDetail, eventWinners } = this.props;
        return(
            <div>
                <Row>
                <Col md="3">       <ProfileNav selected="myevents"/>  </Col>
                <Col md="9">
                {
                    eventDetail ? <Card {...this.pr} key={eventDetail.id} />
                    
                    : <p align="center"><Spinner size={40} spinnerColor={"#e91e63"} spinnerWidth={1} visible={true} /></p>                 
                }
                <br />
                <br />


                {eventWinners ? this.createTable(): <p align="center"><Spinner size={40} spinnerColor={"#e91e63"} spinnerWidth={1} visible={true} /></p> }

                <br/>
                <Button color="primary" onClick={this.handleFinish}> Finalizar </Button>{' '}

                </Col>
                </Row>
            </div>
            )
    }
}


const mapStateToProps = (state) => ({
    eventDetail: state.eventDetail,
    eventWinners: state.eventWinners,

});

const mapDispatchToProps = (dispatch) => ({
    fetchEventDetail: (idEvent) => dispatch(fetchEventDetail(idEvent)),
    fetchEventWinners: (idEvent) => dispatch(fetchEventWinners(idEvent)),
});

export default connect (mapStateToProps, mapDispatchToProps)(FinishEvent);