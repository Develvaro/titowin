import React from "react";
import { connect } from "react-redux";

import { clearError } from "../actions";

const ErrorPopup = ({ error, clearError }) => (
  <div>
    {error}
    <button onClick={clearError}>Aceptar</button>
  </div>
);

const mapDispatchToProps = dispatch => ({
  clearError: () => dispatch(clearError())
});

export default connect(
  null,
  mapDispatchToProps
)(ErrorPopup);
