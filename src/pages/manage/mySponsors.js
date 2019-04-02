import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileNav from "../../components/profileNav";
import {
    fetchUserSponsors
} from '../../actions';

import SponsorCard from '../../components/sponsorCard';

import styled from 'styled-components';

import {Link } from 'react-router-dom';
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

const FlexList = styled.div`
  display: flex; 
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding:5px; 

`;


class MySponsors extends Component {
  componentDidMount() {

    this.props.fetchUserSponsors();


  }
  render() {
    const { listSponsors } = this.props;
    console.log(listSponsors);
    return (
      <div>
        <Row>
        <Col md={{size: 3}}>       <ProfileNav selected="sponsors"/>  </Col>
        <Col md="9">
        <Link to="/profile/sponsors/add">Añadir anuncio</Link>
        <FlexList>
        {
            listSponsors ?
                listSponsors.map(sponsor => 
                  <SponsorCard id={sponsor.id}
                  titulo = {sponsor.texto} 
                  url = {sponsor.urlWeb} 
                  urlPhoto = {sponsor.urlPhoto}
                  validado = {sponsor.validado}
                    />                  )
                :
                <p>Cargando tus sponsors.</p>
        }
        </FlexList>
        </Col>
        {/* <Col md="1"> </Col > */}
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  listSponsors: state.listSponsors,
});

const mapDispatchToProps = dispatch => ({
    fetchUserSponsors: () => dispatch(fetchUserSponsors()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MySponsors);
