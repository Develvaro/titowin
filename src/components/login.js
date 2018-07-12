import React, {Component} from 'react';
import { Container, Row, Col , Button,} from 'reactstrap';
import styled from 'styled-components';
import { login } from '../actions';

import {connect} from 'react-redux';

class Login extends Component  {
    
    render(){
        return(
            <Container>
                <Row>
                    <Row>
                        <Col xs="12" md="12" sm="12"><h2>Login with Social Media or Manually</h2></Col>
                    </Row>
                    <Row>
                        <Col xs="1" md="2">  </Col>
                        <Col xs="10" md="8"><a onClick={this.props.login}><Button color="danger"> Google</Button></a></Col>
                        <Col xs="1" md ="2" ></Col>
                    </Row>
                </Row>
            </Container>
        )};
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    login: () => dispatch(login())
});

export default connect(mapStateToProps,mapDispatchToProps)(Login);