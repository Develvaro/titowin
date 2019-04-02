import React, { Component } from "react";
import { connect } from "react-redux";
import ProfileNav from "../../components/profileNav";
import {
    fetchSponsorsToValidate,
    postValidateSponsor,
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


class ValidateSponsors extends Component {
  componentDidMount() {

    this.props.fetchSponsorsToValidate();


  }
  render() {
    const { listSponsors } = this.props;
    console.log(listSponsors);
    return (
      <div>
        <Row>
        <Col md={{size: 3}}>       <ProfileNav selected="sponsors"/>  </Col>
        <Col md="9">

        <FlexList>
        {
            listSponsors ?
              listSponsors.length > 0 ?
                listSponsors.map(sponsor => 
                  <SponsorCard id={sponsor.id}
                  titulo = {sponsor.texto} 
                  url = {sponsor.urlWeb} 
                  urlPhoto = {sponsor.urlPhoto}
                  validado = {sponsor.validado}
                    />                  )
                : <p>Todos los anuncios están validados</p>
                :
                <p>Cargando..</p>
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
    fetchSponsorsToValidate: () => dispatch(fetchSponsorsToValidate()),
    postValidateSponsor: (id) => dispatch(postValidateSponsor(id)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidateSponsors);
