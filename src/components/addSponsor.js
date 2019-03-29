import React, { Component } from "react";

import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import {
  postSponsor, fetchProfile
} from '../actions'
import styled from 'styled-components';
import Spinner from 'react-spinner-material';

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

const Jumbotron = styled.div`
  margin: 50px
`;

class AddSponsor extends Component {

  componentDidMount() {
    if(this.props.user){
        this.props.fetchProfile(this.props.user);
    }
}
  render() {

    const {postSponsor, handleSubmit} = this.props;
    return (
      <div>
        {this.props.profile ? 
        this.props.profile.tipo == "empresa" ?
        <div>
          <Jumbotron>
          <h4>
            Con este formulario podrás añadir un evento, pero nuestro equipo deverá validarlo para valorar que el contenido sea apropiado antes de poder usarse en un evento.
          </h4>
        </Jumbotron>
        <form onSubmit={handleSubmit(postSponsor)}>
          <FormGroup row> 
            <Label for="nombreanuncio" sm={2}>
              Nombre del Anuncio
            </Label>
            <Col sm={8}>
              <Field
                component={TextInput}
                type="text"
                name="nombreanuncio"
                id="nombreanuncio"
                placeholder="Oferta 2x1 camisetas"
              />
            </Col>
          </FormGroup>



          <FormGroup row>
                <Label for="imgupload" sm={2}>Imagen</Label>
                <Col sm={10}><Field type="file" name="imgupload" id="imgupload" component={FileInput}></Field></Col>
          </FormGroup>

          <FormGroup row>
                <Label for="urlweb" sm={2}>Link</Label>
                <Col sm={8}><Field name="urlweb" id="urlweb" value="" placeholder="www.miempresa.com/mioferta"component={TextInput}></Field></Col>
          </FormGroup>

          <Row> <Col sm={6}></Col><Col sm={4}> <Button color="danger" type="submit" /*disabled={invalid}*/>Añadir</Button> </Col> </Row>
        </form>
        </div>
          
          : <p>You should not be here</p>
          :
          <p align="center"><Spinner size={40} spinnerColor={"#e91e63"} spinnerWidth={1} visible={true} /></p>                 

          }
        
      </div>
    );
  }
}

const filterSelector = formValueSelector("add-sponsor");

const mapStateToProps = (state) => ({
  nombreanuncio: filterSelector(state, "nombreanuncio"),
  urlweb: filterSelector(state, "urlweb"),
  imgupload: filterSelector(state, "imgupload"),

  profile: state.profile,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  postSponsor: (data) => dispatch(postSponsor(data)),
  fetchProfile: (user) => dispatch(fetchProfile(user)),
});

export default reduxForm({ form: "add-sponsor" })(connect(mapStateToProps,mapDispatchToProps)(AddSponsor));