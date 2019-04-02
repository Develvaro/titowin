import React, {Component} from 'react';
import ProfileNav from '../../components/profileNav';
import {Row, Col} from 'reactstrap';


class MyEvents extends Component{
    render(){
        return(
            <div>
            <Row>
            <Col md="3">       <ProfileNav selected="myevents"/>  </Col>
            <Col md="9">
                My Events
            </Col>
            </Row>
            </div>        )
    }
}

export default MyEvents;