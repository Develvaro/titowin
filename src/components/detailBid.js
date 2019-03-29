
import React, { Component } from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Countdown from '../components/Countdown'
import { connect } from "react-redux";
import { postBid, fetchEventDetail } from "../actions";
import Select from "./form/select";
import NumberInput from "./form/numberinput";

import styled from "styled-components";

import moment from "moment";
import {
  required,
  isAfterToday,
  minValue,
  isBeforeEvent,
  isGreaterThanLowest
} from "./form/validation";

require('moment-countdown');
const Imagen = styled.div`
  height: 160px;
  background-image: url(${props => props.url});
  background-size: cover;
  background-repeat: no-repeat;
`;

class DetailBid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selectParticipaciones: [],
    };

    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  select = number => {
    this.state.selectParticipaciones = [];
    for (let i = 1; i <= this.props.eventDetail.participaciones; i++) {
      const option = { value: i, name: i };
      this.state.selectParticipaciones.push(option);
    }
  };

  render() {
    const { eventDetail, profile, handleSubmit, postBid } = this.props;
    {
      eventDetail ? this.select(eventDetail.participaciones) : "";
    }
    {
      eventDetail
        ? (this.state.data = {
            cantidad: eventDetail.bids[0].cantidad + eventDetail.increment
          })
        : "";
    }



    return (
      <div>
        <Row>
          <Col>
            {" "}
            {eventDetail ? <Countdown date = {moment.unix(eventDetail.fecha.seconds).toDate()} /> : "Cargando..."}{" "}
          </Col>
 
        </Row>
        <Col sm="12">
          <Imagen
            url={eventDetail ? eventDetail.urlPhoto : ""}
            alt="Event Photo"
          />
        </Col>
        <Row />

        <Row>
          <Col sm="8">
            {" "}
            Última Puja realizada:
            <br /> {eventDetail ? eventDetail.bids[0].cantidad : "Cargando..."}
          </Col>
          <Col sm="4">
            {" "}
            Participaciones: <br />
            {eventDetail ? eventDetail.participaciones : "Cargando..."}
          </Col>
        </Row>

        <form onSubmit={handleSubmit(postBid)}>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Mi Puja</ModalHeader>
            <ModalBody>TEXTO</ModalBody>
            <ModalFooter>
              <Button type="submit" color="danger">
                Pujar
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>
          <Row>
            <Col>
              Quiero Pujar <br />
              <Field
                parse={value => Number(value)}
                name="cantidad"
                id="cantidad"
                component={NumberInput}
              />
            </Col>
            <Col>
              Participaciones<br />
              <Field
                component={Select}
                type="select"
                name="participaciones"
                id="participaciones"
                options={this.state.selectParticipaciones}
              />
            </Col>
            <Col>
              {" "}
              <br />
              <Button color="danger" type="submit">
                {" "}
                Pujar
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

const filterSelector = formValueSelector("bid");

const validate = ({ cantidad, participaciones }) => ({
  cantidad: required(cantidad),
  participaciones: required(participaciones) || minValue1(participaciones)
});

const mapStateToProps = state => {
  const eventDetail = state.eventDetail;
  return {
    participaciones: filterSelector(state, "participaciones"),
    cantidad: filterSelector(state, "cantidad"),
    eventDetail,
    profile: state.profile,
    user: state.user,
    initialValues: {
      cantidad: eventDetail
        ? eventDetail.bids[0].cantidad + eventDetail.increment
        : 0,
      participaciones: 1
    }
  };
};

const minValue0 = minValue(0);
const minValue1 = minValue(1);

const mapDispatchToProps = dispatch => ({
  postBid: data => dispatch(postBid(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "bid", validate, enableReinitialize: true })(DetailBid));
