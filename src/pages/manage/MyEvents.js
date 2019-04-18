import React, {Component} from 'react';
import ProfileNav from '../../components/profileNav';
import {Row, Col,} from 'reactstrap';
import { connect } from "react-redux";
import {fetchMyEvents} from '../../actions';
import CardManage from '../../components/cardManage';
import { formValueSelector } from "redux-form";
import { reduxForm, Field } from "redux-form";
import Spinner from 'react-spinner-material';

import styled from 'styled-components';
import {Link } from 'react-router-dom';
import Select from "../../components/form/select";
const FlexList = styled.div`
  display: flex; 
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding:5px; 

`;


class MyEvents extends Component{


    componentDidMount(){
        if(this.props.user){
            this.props.fetchMyEvents(this.props.user.uid);
        }
    }
    componentDidUpdate(prevProps){
        if(!prevProps.user && this.props.user && !prevProps.events){
            this.props.fetchMyEvents(this.props.user.uid);
        }
    }
    render(){
        const { events } = this.props;
        console.log(events);
        if (!events) {
            return         <Row>
            <Col md="4"><span></span></Col>
            <Col md="4"><p align="center"><Spinner size={40} spinnerColor={"#e91e63"} spinnerWidth={1} visible={true} /></p></Col>
            <Col md="4"><span></span></Col>
          </Row>;
          }

        
        return(
            <div>
            <Row>
            <Col md="3">       <ProfileNav selected="myevents"/>  </Col>
            <Col md="9">

            <Field
            component={Select}
            name="estado"
            id="estado"
            options={[
              {
                name: "Todos",
                value: ""
              },
              {
                  name: "Abierto",
                  value: "abierto" ,
              },
            {
                name: "Pendiente de Pago",
                value: "pendingpay" ,
            },
            //{
            //    name: "Pagado",
            //    value: "paid" ,
            //},
            {
                name: "Pendiente Sponsor",
                value: "pendingsponsor",
            },
            {
                name: "Pendiente Premio",
                value: "pendingprize" ,
            },
            {
                name: "Finalizado",
                value: "finished" ,
            },

            ]}
          />
            <FlexList>
            {
                this.props.selectedStatus
                ? events.map(event =>
                    event.estado
                        .toLowerCase() == this.props.selectedStatus.toLowerCase() ?
                        ( <div><p>{event.ticket}</p><CardManage {...event} key={event.id} /></div>
                    ) : null
                    )
                : events.map(event => <CardManage {...event} key={event.id} />  
                )
            }
        </FlexList>            </Col>
            </Row>
            </div>        
            )
    }
}


const filterSelector = formValueSelector("statusfilter");


const mapStateToProps = state => ({
    user: state.user,
    events: state.events,
    selectedStatus: filterSelector(state, "estado"),

  });
  
  const mapDispatchToProps = dispatch => ({
      fetchMyEvents: (id) => dispatch(fetchMyEvents(id)),
  });
  export default reduxForm({
    form: "statusfilter",
    enableReinitialize: true
  })(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(MyEvents)
  );
  
  /* 
                events.map(event => {
                        const status = event.estado
                        let color = "";
                        switch (status){
                            case "abierto":
                                color = "blue";
                                break;
                            case "bidfinished":
                                color = "red";
                                break;
                            case "paid":
                                color = "yellow";
                            case "finished":
                                color = "green";
                            default:
                                "";
  */