import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import ProfileNav from '../../components/profileNav';
import AddEvent from '../../components/addEvent';

class AddEventPage extends Component{
    render(){
        return(
            <div>
            <Row>
            <Col md="3">       <ProfileNav selected="AddEventPage"/>  </Col>
            <Col md="9">
            <AddEvent />
            </Col>
            </Row>
            </div>
        )
    }
}

export default AddEventPage;