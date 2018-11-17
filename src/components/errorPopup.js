import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { connect } from "react-redux";

import { clearError } from "../actions";

class ErrorPopup extends Component {
  render() {
    const { message, clearError } = this.props;
    return (
      <Modal isOpen={message} toggle={clearError}>
        <ModalHeader toggle={clearError}>Error</ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={clearError}>
            Aceptar
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  message: state.error
});

const mapDispatchToProps = dispatch => ({
  clearError: () => dispatch(clearError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorPopup);
