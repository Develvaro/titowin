import React, { Component } from "react";
import CardList from "./cardList";
import { connect } from "react-redux";

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
