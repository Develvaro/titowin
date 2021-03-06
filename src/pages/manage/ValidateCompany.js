import React, {Component} from 'react';
import { fetchProfile, 
        fetchValidationCompanyDetail,
        postValidateCompany,
} from '../../actions';
import {Row, Col, Button} from 'reactstrap';
import ProfileNav from '../../components/profileNav';
import { connect } from "react-redux";
import Spinner from 'react-spinner-material';

import ValidateMe from '../../components/validateMe';

class ValidateCompany extends Component {
    componentDidMount() {
        if(this.props.user){
            this.props.fetchProfile(this.props.user);
        }
        this.props.fetchValidationCompanyDetail(this.props.match.params.id);
    }
    render(){
        const {validationCompanyDetail, postValidateCompany} = this.props

        if(validationCompanyDetail){
            console.log(validationCompanyDetail);
        }
        /*
            email: "papasfritas@gmail.com"
            empresa: "Papas Fritas SL"
            fileurl: "sdfa"
            id: "5ed08003-3219-4fbd-8899-b686dd06b442"
            nif: "123123123"
            place: "Mi casaº"
            telefono: "+34661214124"
            userID: "e8YXAggodqZRenFC2MOiMgoLPF83"
        */
        return(
            <div>
                <Row>
                    <Col md="3">       <ProfileNav/>  </Col>
                    <Col md="9">
                        
                    <ValidateMe />

                    </Col>
                </Row>
          </div>
        )};
}

const mapStateToProps = state => ({
    profile: state.profile,
    user: state.user,
    validationCompanyDetail: state.validationCompanyDetail,
  });
  
  const mapDispatchToProps = dispatch => ({
      fetchValidationCompanyDetail: (id) => dispatch(fetchValidationCompanyDetail(id)),
      fetchProfile: (user) => dispatch(fetchProfile(user)),
      postValidateCompany: (id) => dispatch(postValidateCompany(id)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(ValidateCompany);