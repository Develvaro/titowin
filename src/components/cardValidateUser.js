import React, {Component} from 'react';
import {Row, Col, Button} from 'reactstrap';
import {validateUser, cancelValidationUser} from '../actions';
import Card from './card';

class CardValidateUser extends Component {


    render(){

        const {userID, nif, file, email, place, companyName} = this.props;
        return(
            <div>
                <Row>
                    <Col md="3">NIF:</Col>
                    <Col md="3">{nif}</Col>
                    <Col md="3">Empresa:</Col>
                    <Col md="3">{companyName}</Col>
                </Row>

                <Row>
                    <Col md="3">Fichero:</Col>
                    <Col md="3"><a href={file}>Link</a></Col>
                    <Col md="3">Email:</Col>
                    <Col md="3"><a href={"mailto:" + email } >{email}</a></Col>
                </Row>

                <Row>
                    <Col md="3">Lugar:</Col>
                    <Col md="3">{place}</Col>
                    <Col md="3"><Button color="Success" onClick={(userID) => validateUser(userID)}>Validar</Button></Col>
                    <Col md="3"><Button color="Warning" onClick={(userID) => cancelValidationUser(userID)}>Cancelar</Button></Col>}>
                </Row>
            </div>
        )};
}
const mapStateToProps = state => ({
    user: state.user
  });
  
  const mapDispatchToProps = dispatch => ({
    validateUser: userID => dispatch(validateUser(userID)),
    cancelValidationUser: userID => dispatch(cancelValidationUser(userID))
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CardValidateUser);
  
