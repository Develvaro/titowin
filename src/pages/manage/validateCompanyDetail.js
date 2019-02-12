import React, {Component} from 'react';
import { fetchProfile, 
        fetchValidationCompanyDetail,
        postValidateCompany,
} from '../../actions';
import {Row, Col, Button} from 'reactstrap';
import ProfileNav from '../../components/profileNav';
import { connect } from "react-redux";
import Spinner from 'react-spinner-material';
class ValidateCompanyDetail extends Component {
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
                    {validationCompanyDetail ? 
                        <div>
                            <Row>
                                <Col sm={2}>Email</Col>
                                <Col sm={8}><a href={"mailto:"+validationCompanyDetail.email}>{validationCompanyDetail.email}</a></Col>
                            </Row>
                            <Row>
                                <Col sm={2}>Empresa</Col>
                                <Col sm={8}>{validationCompanyDetail.empresa}</Col>
                            </Row>
                            <Row>
                                <Col sm={2}>NIF</Col>
                                <Col sm={8}>{validationCompanyDetail.nif}</Col>
                            </Row>

                            <Row>
                                <Col sm={2}>Lugar</Col>
                                <Col sm={8}>{validationCompanyDetail.place}</Col>
                            </Row>
                            <Row>
                                <Col sm={2}>Telefono</Col>
                                <Col sm={8}>{validationCompanyDetail.telefono}</Col>
                            </Row>
                            <Row>
                                <Col sm={2}></Col>
                                <Col sm={8}></Col>
                            </Row>


                            <Row><Col sm={2}><span></span></Col><Col sm={8}><button color="Danger" onClick={() => postValidateCompany(validationCompanyDetail.id)}>Validar</button></Col></Row>
                        </div>
                        :
                        <p align="center"><Spinner size={40} spinnerColor={"#e91e63"} spinnerWidth={1} visible={true} /></p>
                    }

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

export default connect(mapStateToProps, mapDispatchToProps)(ValidateCompanyDetail);