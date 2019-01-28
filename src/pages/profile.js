import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileNav from "../components/profileNav";
import { Link } from 'react-router-dom'


import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

import TextInput from "../components/form/textinput";
import {Field} from "redux-form";

class Profile extends Component {
  componentDidMount() {
    //this.props.location.pathname
  }
  render() {
    const { profile } = this.props;
    console.log(profile);
    return (
      <div>
        <Row>
        <Col md="3">       <ProfileNav/>  </Col>
        <Col md="9"> 
        <Form>
        <FormGroup row> 
            <Label for="name" sm={2}>
                Correo
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="email"
                id="name"
                placeholder={profile ? profile.email : "Cargando..."}
                disabled
              />
            </Col>
          </FormGroup>

          <FormGroup row> 
            <Label for="name" sm={2}>
                Estado
            </Label>
            <Col sm={8}>
            {profile ? profile.validado ? "Usuario validado" : "Usuario no validado" : "Cargando ..."}
            {profile ? !profile.validado ? <Col sm="{8}"> <Button color="danger"><Link to="/validateme">Validar</Link></Button></Col> : "" : ""}
            </Col>

          </FormGroup>
        </Form>
        </Col>
        </Row>
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
