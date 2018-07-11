import React, { Component } from 'react';
import Card from './components/card';
import {connect} from 'react-redux';

import './App.css';
import { fetchEvents } from './actions';


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

  

class App extends Component {
  render() {
    return (
      <div className="App">
        <Card titulo="Unicaja-Estudiantes" categoria="Baloncesto" fecha = "Fecha" lugar ="Santiago Bernabeu" pujaActual="50" id ="1" urlPhoto="https://i.stack.imgur.com/jcBNn.jpg" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  events : state.events
});

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: (pais, ciudad) => dispatch(fetchEvents(pais, ciudad))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
