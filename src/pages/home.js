import React, { Component } from "react";
import CardList from "../components/cardList";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <CardList />
      </div>
    );
  }
}

export default Home;
