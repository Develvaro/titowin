import React, { Component } from "react";

import { reduxForm, Field } from "redux-form";
import styled from "styled-components";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import { fetchEvents, fetchCountries } from "../actions";

import Select from "./select";

import Card from "./card";

class CardList extends Component {
  componentDidMount() {
    const { fetchEvents, fetchCountries } = this.props;
    fetchCountries();
    fetchEvents();
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedCountry !== prevProps.selectedCountry) {
      this.props.fetchEvents(this.props.selectedCountry);
    }
  }

  render() {
    const { events, countries } = this.props;
    if (!events || !countries) {
      return <p>Cargando</p>;
    }
    console.log(this.props);
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
        />
        <div>{events.map(event => <Card {...event} key={event.id} />)}</div>
      </div>
    );
  }
}

const filterSelector = formValueSelector("filter");
const mapStateToProps = state => ({
  events: state.events,
  countries: state.countries,
  selectedCountry: filterSelector(state, "country")
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: (country, city) => dispatch(fetchEvents(country, city)),
  fetchCountries: () => dispatch(fetchCountries())
});

export default reduxForm({ form: "filter" })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CardList)
);
