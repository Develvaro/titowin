import React, { Component } from "react";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import ProfileNav from "./profileNav";
import {
  postValidateMe,
} from '../actions'

import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
} from "reactstrap";

import TextInput from "./form/textinput";
import Select from "./form/select";
import DatePicker from "./form/datepicker";
import FileInput from "./form/fileinput";
import TimePicker from "./form/timepicker";
import NumberInput from "./form/numberinput";

class ValidateMe extends Component {
  render() {

    const {postValidateMe, handleSubmit} = this.props;
    return (
      
      <div>
        <Row>
        <Col md="3">       <ProfileNav/>  </Col>
        <Col md="9">         
        <Form onSubmit={handleSubmit(postValidateMe)}>
          <FormGroup row> 
            <Label for="name" sm={2}>
              Nombre de la empresa
            </Label>
            <Col sm={8}>
              <Field
                component={TextInput}
                type="text"
                name="companyName"
                id="name"
                placeholder=""
              />
            </Col>
          </FormGroup>


          <FormGroup row> 
            <Label for="nif" sm={2}>
              NIF
            </Label>
            <Col sm={8}>
              <Field
                component={TextInput}
                type="text"
                name="nif"
                id="nif"
                placeholder=""
              />
            </Col>
          </FormGroup>


          <FormGroup row> 
            <Label for="email" sm={2}>
              email: 
            </Label>
            <Col sm={8}>
              <Field
                component={TextInput}
                type="text"
                name="email"
                id="email"
                placeholder="example@gmail.com"
              />
            </Col>
          </FormGroup>

          <FormGroup row> 
            <Label for="phone" sm={2}>
              Teléfono de Contacto
            </Label>
            <Col sm={8}>
              <Field
                component={TextInput}
                type="text"
                name="phone"
                id="phone"
                placeholder="+34666999888"
              />
            </Col>
          </FormGroup>

          <FormGroup row> 
            <Label for="place" sm={2}>
            Lugar
            </Label>
            <Col sm={8}>
              <Field
                component={TextInput}
                type="text"
                name="place"
                id="place"
                placeholder="+34666999888"
              />
            </Col>
          </FormGroup>

          <FormGroup row>
                <Label for="imgupload" sm={2}>Imágen del Evento</Label>
                <Col sm={10}><Field name="imgupload" id="imgupload" component={FileInput}></Field></Col>
          </FormGroup>

          <Row> <Col sm={6}></Col><Col sm={4}> <Button color="danger" type="submit" /*disabled={invalid}*/>Validar</Button> </Col> </Row>

          
        </Form>
        
        </Col>
        </Row>
      </div>
    );
  }
}

const filterSelector = formValueSelector("validate-me");

const mapStateToProps = (state) => ({
  name: filterSelector(state, "name"),
  phone: filterSelector(state, "phone"),
  nif: filterSelector(state, "nif"),
  email: filterSelector(state, "email"),
  imgupload: filterSelector(state, "imgupload"),
  place: filterSelector(state, "place"),

  profile: state.profile,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  postValidateMe: (data) => dispatch(postValidateMe(data)),
});

export default reduxForm({ form: "validate-me" })(connect(mapStateToProps,mapDispatchToProps)(ValidateMe));