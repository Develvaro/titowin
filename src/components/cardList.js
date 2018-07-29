import React, { Component } from "react";

import { reduxForm, Field } from "redux-form";
import styled from "styled-components";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import {
  fetchEvents,
  fetchCountries,
  fetchCities,
  initialFetch
} from "../actions";
import { Button } from "reactstrap";

import Select from "./form/select";
import TextInput from "./form/textinput";

import Card from "./card";

class CardList extends Component {
  componentDidMount() {
    const { initialFetch } = this.props;
    initialFetch();
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedCountry !== prevProps.selectedCountry) {
      console.log(this.props.selectedCountry);
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
      selectedCountry
    } = this.props;
    if (!events) {
      return <p>Cargando</p>;
    }

    return (
      <div>
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

        <Field
          component={Select}
          name="city"
          id="city"
          options={[
            {
              name: "----",
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

        <Button
          color="danger"
          onClick={() => this.props.fetchEvents(selectedCountry, selectedCity)}
        >
          Buscar
        </Button>

         <br/> 
         
         <strong> Filtros </strong>
        <Field
          component={TextInput}
          name="eventName"
          id="eventName"
          /> 


        <Field
          component={Select}
          name="category"
          id="category"
          options={[
            {
              name: "----",
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
        <div>
          {this.props.filterName
            ? events.map(
                event =>
                  event.titulo.toLowerCase().includes(this.props.filterName.toLowerCase()) ? (
                    <Card {...event} key={event.id} />
                  ) : null
              )
            : events.map(event => <Card {...event} key={event.id} />)}
        </div>
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
  selectedCity: filterSelector(state, "city"),
  filterName: filterSelector(state, "eventName")
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: (country, city) => dispatch(fetchEvents(country, city)),
  fetchCountries: () => dispatch(fetchCountries()),
  fetchCities: country => dispatch(fetchCities(country)),
  initialFetch: () => dispatch(initialFetch())
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
