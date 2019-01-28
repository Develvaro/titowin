import React, { Component } from "react";

import { reduxForm, Field } from "redux-form";
import styled from "styled-components";
import Spinner from 'react-spinner-material';

import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import {
  fetchEvents,
  fetchCountries,
  fetchCities,
  initialFetch,
  fetchCityPlaces
} from "../actions";
import { Button } from "reactstrap";
import { Row, Col } from 'reactstrap';

import Select from "./form/select";
import TextInput from "./form/textinput";

import Card from "./card";

class CardList extends Component {

  isFirst(){
    if (this.state.count % this.state.numElemRow == 1)
      {
        return true;
      }
      else{
        return false;
      }
  }

  isLast(){
    if (this.state.count % this.state.numElemRow == 1)
    {
      return true;
    }
    else{
      return false;
    }
  }

  incrementCount() {
    this.setState((state) => {
      // Important: read `state` instead of `this.state` when updating.
      return {count: (state.count % state.numElemRow ) + 1}
    });
  }

  componentDidMount() {
    const { initialFetch } = this.props;
    //TODO Aquí el setState?
    this.setState((state) => {
      // Important: read `state` instead of `this.state` when updating.
      return {
        count: 0,
        numElemRow : 5
      }
    });
    initialFetch();
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedCountry !== prevProps.selectedCountry) {

      this.setState((state) => {
        return {
          count: 0,
        }
      });

      this.props.fetchEvents(this.props.selectedCountry);
      this.props.fetchCities(this.props.selectedCountry);
    }
  }

  render() {
    const {
      events,
      countries,
      cities,
      selectedCity,
      selectedCountry,
      cityPlaces,
      selectedPlace
    } = this.props;


    if (!events) {
      return         <Row>
      <Col md="4"><span></span></Col>
      <Col md="4"><p align="center"><Spinner size={40} spinnerColor={"#e91e63"} spinnerWidth={1} visible={true} /></p></Col>
      <Col md="4"><span></span></Col>
    </Row>;
    }

    return (
      <div>
        <Row>
          <Col md="4"><span></span></Col>
          <Col md="4"><h5>Eventos</h5></Col>
          <Col md="4"><span></span></Col>
        </Row>
        <Row >
          <Col md="3"><span></span></Col>
          <Col md="2">
          <Field
            component={Select}
            name="country"
            id="country"
            options={countries.map(country => ({
              name: country.nombre,
              value: country.nombre
            }))}
            onChangeFn={country => this.props.fetchCities(country)}
          />
          </Col>
          
          <Col md="2">
          <Field
            component={Select}
            name="city"
            id="city"
            options={[
              {
                name: "Todas",
                value: ""
              },
              ...(cities
                ? cities.map(city => ({
                    name: city.nombre,
                    value: city.nombre
                  }))
                : {})
            ]}
            onChangeFn={city => this.props.fetchCityPlaces(city)}
          />
          </Col>

          <Col md="2">
          <Field
            component={Select}
            name="place"
            id="place"
            options={[
              {
                name: "Todos",
                value: ""
              },
              ...(cityPlaces
                ? cityPlaces.map(place => ({
                    name: place.nombre,
                    value: place.id
                  }))
                : {})
            ]}
          />
          </Col>
          <Col md="3"><span></span></Col>

        </Row>
        <br></br>
        <Row>
          <Col md="5"><span></span></Col>
          <Col md="2">
            <Button
              color="danger"
              onClick={() =>
                this.props.fetchEvents(selectedCountry, selectedCity, selectedPlace)
              }
            >
              Buscar
            </Button>
              </Col>
          <Col md="5"><span></span></Col>
       
        </Row>
        



        <br />
        <strong> Filtros </strong>
        <br/>
        <Row>

          <Col md="3"><span></span></Col>
          <Col md="1"><label for="eventName">Nombre </label></Col>
          
          <Col md="2">
            <Field component={TextInput} name="eventName" id="eventName" />
          </Col>
        <Col md="1"><label for="category">Tipo</label></Col>
        <Col md="2">
        
        <Field
          component={Select}
          name="category"
          id="category"
          options={[
            {
              name: "Todas",
              value: ""
            },
            ...(cities
              ? cities.map(city => ({
                  name: city.nombre,
                  value: city.nombre
                }))
              : {})
          ]}
        />
        </Col>
        <Col md="3"><span></span></Col>
        </Row>

        <Row>

          <div>
            {this.props.filterName
              ? events.map(event =>
                  event.titulo
                    .toLowerCase()
                    .includes(this.props.filterName.toLowerCase()) ? (
                    <Card {...event} key={event.id} />
                  ) : null
                )
              : events.map(event => <Col md="2"> <Card {...event} key={event.id} /> </Col>
              )}
          </div>
        </Row>

      </div>
    );
  }
}

const filterSelector = formValueSelector("filter");

const mapStateToProps = state => ({
  events: state.events,
  countries: state.countries,
  selectedCountry: filterSelector(state, "country"),
  cities: state.cities,
  cityPlaces: state.cityPlaces,
  selectedCity: filterSelector(state, "city"),
  selectedPlace: filterSelector(state, "place"),
  filterName: filterSelector(state, "eventName")
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: (country, city) => dispatch(fetchEvents(country, city)),
  fetchCountries: () => dispatch(fetchCountries()),
  fetchCities: country => dispatch(fetchCities(country)),
  initialFetch: () => dispatch(initialFetch()),
  fetchCityPlaces: cityID => dispatch(fetchCityPlaces(cityID))
});

export default reduxForm({
  form: "filter",
  enableReinitialize: true
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CardList)
);
