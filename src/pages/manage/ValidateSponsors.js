import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import ProfileNav from '../../components/profileNav';
class ValidateSponsors extends Component{
    render(){
        return(
            <div>
            <Row>
            <Col md="3">       <ProfileNav selected="addplaceandmanager"/>  </Col>
            <Col md="9">
            ValidateSponsors
            </Col>
            </Row>
            </div>        )
    }
}

export default ValidateSponsors;