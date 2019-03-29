//TODO

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { reduxForm, Field } from "redux-form";
import styled from "styled-components";
import { fetchProfile } from '../actions';

import Spinner from 'react-spinner-material';


import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import {
    fetchValidationRequests,
} from "../actions";
import { Button } from "reactstrap";
import { Row, Col, Table } from 'reactstrap';
import ProfileNav from './profileNav';
class ListValidateUsers extends Component {

    componentDidMount() {
        if(this.props.user){
            this.props.fetchProfile(this.props.user);
            if(this.props.user.type == "admin")
            {
                this.props.fetchValidationRequests();
            }
        }
    }

    render(){

        const {
            companyValidationRequests,

        } = this.props;

        console.log(companyValidationRequests);


        return(
        <div>
            <Row>
            <Col md="3">       <ProfileNav selected="listvalidate"/>  </Col>
            <Col md="9">
            <Table>
                <thead>
                    <tr>
                        <th>Empresa</th>
                        <th>NIF</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Validar</th>
                    </tr>
                </thead>
                <tbody>
                    {companyValidationRequests ? companyValidationRequests.map(request => <tr><td>{request.empresa}</td><td>{request.nif}</td><td>{request.email}</td><td>{request.telefono}</td><td><Link to={"/admin/users/validatecompany/" + request.id}>Ir</Link></td></tr>)
                    : <p align="center"><Spinner size={40} spinnerColor={"#e91e63"} spinnerWidth={1} visible={true} /></p>
                    }
                </tbody>
            </Table>
            </Col>
            </Row>
        </div>
        )};
}

const filterSelector = formValueSelector("filterValidations");

const mapStateToProps = state => ({
  
  profile: state.profile,
  user: state.user,
  companyValidationRequests: state.companyValidationRequests,

  filterName: filterSelector(state, "companyName")
});

const mapDispatchToProps = dispatch => ({
    fetchValidationRequests: () => dispatch(fetchValidationRequests()),
    fetchProfile: (user) => dispatch(fetchProfile(user))

});

export default reduxForm({
  form: "filterValidations",
  enableReinitialize: true
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListValidateUsers)
);
