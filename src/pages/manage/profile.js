import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileNav from "../../components/profileNav";
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import Spinner from 'react-spinner-material';

import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import TextInput from "../../components/form/textinput";
import {Field} from "redux-form";

class Profile extends Component {
  componentDidMount() {
    //this.props.location.pathname
  }
  render() {
    const { profile } = this.props;
    if(profile && profile.tipo == "empresa")
    {
      return <Redirect to="/profile/sponsors" />
    }
    if(profile && profile.tipo == "manager"){
      return <Redirect to="/manage/myevents" />
    }
    if(profile && profile.tipo == "admin"){
      return <Redirect to="/admin/validatesponsors" />
    }
    return (      
      <div>
        {profile ? <div>
          <Row>
        <Col md="3">       <ProfileNav selected="profile"/>  </Col>
        <Col md="8">

      
        <h1 align="center">Bienvenido {this.props.user.displayName}</h1>
        <hr/>
       <h3>Estás a punto de formar parte de Titowin</h3>
       <p>En Titowin, podrás participar en pujas para patrocinar eventos y que tu publicidad llegue a un amplio público de manera inmediata. </p>
       <p align="justify">Estás a un sólo paso de poder realizar tus pujas. Para ello, tenemos que asegurarnos de que eres una empresa y deberás mandarnos un 
          <a href="mailto:soportetitowin@gmail.com?subject=Validacion Empresa"> email</a> con el asunto "Validación Empresa" desde el correo que quieras validar 
         con los datos adjuntos necesarios para que podemos verificar vuestra identidad. Así como el nif, una copia de vuestra identidad, vuestra dirección física etc..
      </p>
      <hr />
      <h3>¿Quieres organizar eventos?</h3>
      <p align="justify">Si lo que buscas en Titowin es organizar tus eventos con nosotros, podrás registrarte como manager de un lugar, para ello deberás mandarnos un <a href="mailto:soportetitowin@gmail.com?subject=Validacion Manager"> email</a> con el asunto "Validación Manager" con toda la información necesaria para 
          identificar que el lugar que nos propones es de tu propiedad o puedes organizar eventos allí y localizarlo.
          Una vez te verifiquemos como dueño del lugar podrás crear eventos para que otras empresas lo patrocinen con su publicidad.
      </p>
        </Col>
        </Row>
        </div> : <p align="center"><Spinner size={40} spinnerColor={"#e91e63"} spinnerWidth={1} visible={true} /></p>                 
}
        
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  null
)(Profile);
