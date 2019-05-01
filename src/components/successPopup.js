import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { clearSuccess } from "../actions";

const getSuccessMessage = (type, data) => {
  switch (type) {
    case "bid":
      const { participaciones, cantidad } = data;
      return (
        <div>{`${participaciones} pujas de ${cantidad}€ se han realizado correctamente`}</div>
      );
      break;
    case "postValidate":
        return <div>Su petición de validación ha sido registrada</div>
        break;
    case "postSponsor":
        return <div>Su anuncio ha sido procesado, pronto un administrador lo validará</div>
    case "deleteSponsor":
        return <div>Anuncio eliminado correctamente.</div>
    case "validateSponsor":
        return <div>Anuncio validado correctamente</div>
    default:
      return null;
  }
};

class SuccessPopup extends Component {
  // componentDidUpdate(prevProps) {
  //   if (!prevProps.type && this.props.type) {
  //     setTimeout(this.props.clearSuccess, 3000);
  //   }
  // }


  render() {
    const { data, type, clearSuccess } = this.props;
    if(data){
      if(data.redirect){
        return (
        <div>
          <Modal isOpen={type} toggle={clearSuccess}>
            <ModalHeader toggle={clearSuccess}>Correcto</ModalHeader>
            <ModalBody>{getSuccessMessage(type, data)}</ModalBody>
          </Modal>
          <Redirect to = {data.redirect} />
        </div>
        )
      }
    }
    return (
      <div>
        <Modal isOpen={type} toggle={clearSuccess}>
          <ModalHeader toggle={clearSuccess}>Correcto</ModalHeader>
          <ModalBody>{getSuccessMessage(type, data)}</ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.success.data,
  type: state.success.type
});

const mapDispatchToProps = dispatch => ({
  clearSuccess: () => dispatch(clearSuccess())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessPopup);


/*

*/