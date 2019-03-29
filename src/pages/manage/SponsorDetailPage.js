import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import ProfileNav from '../../components/profileNav';
import SponsorDetail from '../../components/sponsorDetail';

class SponsorDetailPage extends Component{


    render(){
        return(
            <div>
            <Row>
            <Col md="3">       <ProfileNav selected="sponsordetail"/>  </Col>
            <Col md="9">
            <SponsorDetail id={this.props.match.params.id} />
            </Col>
            </Row>
            </div>
        )
    }
}

export default SponsorDetailPage;