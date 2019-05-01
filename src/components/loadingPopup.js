import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { connect } from "react-redux";
import Spinner from 'react-spinner-material';

class LoadingPopup extends Component {

  render() {
    const {loading} = this.props;
    return (
      <Modal isOpen={loading.status} >
        <ModalBody>          <p align="center"><Spinner size={80} spinnerColor={"#e91e63"} spinnerWidth={1} visible={true} /></p>                 
</ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading
});


export default connect(
  mapStateToProps,
  null,
)(LoadingPopup);
