import React, { Component } from "react";

import { reduxForm, Field } from "redux-form";
import styled from "styled-components";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import { fetchEvents, fetchCountries, fetchCities } from "../actions";

import Select from "./form/select";
import TextInput from "./form/textinput";

import Card from "./card";

class CardList extends Component {
  componentDidMount() {
    const { fetchEvents, fetchCountries, fetchCities } = this.props;
    fetchCountries();
    fetchEvents();
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedCountry !== prevProps.selectedCountry) {
      console.log(this.props.selectedCountry);
      this.props.fetchEvents(this.props.selectedCountry);
      this.props.fetchCities(this.props.selectedCountry);
    }
  }

  render() {
    const { events, countries, cities } = this.props;
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
            value: country.nombre,
          }))}
        />

        <Field
          component={TextInput}
          name="eventName"
          id="eventName"
          />
        {/* {this.props.selectedCountry ? <Field
          component={Select}
          name="city"
          id="city"
          options={this.props.cities.map(city => ({
            name: city.nombre,
            value: city.nombre,
          }))
          }
        /> : <Field
        component={Select}
        name="city"
        id="city"
        /> 
        } */}

        <div>{ this.props.filterName ? events.map(event => event.titulo.includes(this.props.filterName) ? <Card {...event} key={event.id} /> : null)
         : events.map(event=> <Card {...event} key={event.id} />) } 

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
  filterName: filterSelector(state, "eventName"),
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: (country, city) => dispatch(fetchEvents(country, city)),
  fetchCountries: () => dispatch(fetchCountries()),
  fetchCities: (country) => dispatch(fetchCities(country))
 });

export default reduxForm({ form: "filter" })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CardList)
);
