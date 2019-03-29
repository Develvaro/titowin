import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import ProfileNav from '../../components/profileNav';
import AddSponsor from '../../components/addSponsor';
class AddSponsorPage extends Component{
    render(){
        return(
            <div>
            <Row>
            <Col md="3">       <ProfileNav selected="addsponsor"/>  </Col>
            <Col md="9">
              <AddSponsor />
            </Col>
            </Row>
            </div>
        )
    }
}

export default AddSponsorPage;