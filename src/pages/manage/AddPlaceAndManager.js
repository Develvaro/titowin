import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import ProfileNav from '../../components/profileNav';
import AddPlace from '../../components/addPlace';
class AddPlaceAndManager extends Component{
    render(){
        return(
            <div>
            <Row>
            <Col md="3">       <ProfileNav selected="addplaceandmanager"/>  </Col>
            <Col md="9">
            <AddPlace />
            </Col>
            </Row>
            </div>
        )
    }
}

export default AddPlaceAndManager;