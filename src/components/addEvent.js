import React, { Component } from "react";
import moment from 'moment';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import {
  postEvent,
} from '../actions'

import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
} from "reactstrap";

import TextInput from "./form/textinput";
import Select from "./form/select";
import DatePicker from "./form/datepicker";
import FileInput from "./form/fileinput";
import TimePicker from "./form/timepicker";
import NumberInput from "./form/numberinput";

class AddEvent extends Component {
  render() {

    const {postEvent, handleSubmit, invalid} = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(postEvent)}>
          <FormGroup row> 
            <Label for="name" sm={2}>
              Nombre del Evento
            </Label>
            <Col sm={8}>
              <Field
                component={TextInput}
                type="text"
                name="eventName"
                id="name"
                placeholder="Madrid - Barcelona"
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="category" sm={2}>
              Categoría
            </Label>
            <Col sm={8}>
              <Field
                component={Select}
                type="select"
                name="category"
                id="category"
                options={[
                  {
                    value: "Concierto",
                    name: "Concierto"
                  },
                  {
                    value: "Futbol",
                    name: "Futbol"
                  },
                  {
                    value: "Baloncesto",
                    name: "Baloncesto"
                  }
                ]}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="eventDate" sm={2} >Fecha del Evento</Label>
            <Col sm={3}>
          <Field name="eventDate" id="eventDate" component={DatePicker} /></Col>


          <Label for="eventTime" sm={2} >Hora del Evento</Label>
            <Col sm={3}>
            <Field name="eventTime" id="eventTime" component={TimePicker} /></Col>
          </FormGroup>

          <FormGroup row>
                <Label for="imgupload" sm={2}>Imágen del Evento</Label>
                <Col sm={10}><Field name="imgupload" id="imgupload" component={FileInput}></Field></Col>
          </FormGroup>

          <FormGroup row>
                <Label for="place" sm={2}>Lugar</Label>
                <Col sm={8}><Field name="place" id="place" value="" component={TextInput}></Field></Col>
          </FormGroup>


          <FormGroup row>
            <Label for="bidDate" sm={2} >Dia fin de puja</Label>
            <Col sm={3}><Field name="bidDate" id="bidDate" component={DatePicker} /></Col>
 
            <Label for="bidTime" sm={2} >Hora fin de puja</Label>
            <Col sm={3}><Field name="bidTime" id="bidTime" component={TimePicker} /></Col>
          </FormGroup>


          <FormGroup row>
            <Label for="startBid" sm={2}>Puja Inicial</Label>
            <Col sm={3}><Field name="startBid" id="startBid" component={NumberInput} /></Col>


          <Label for="increment" sm={2} >Incremento Mínimo</Label>
            <Col sm={3}><Field name="increment" id="increment" component={NumberInput} /></Col>
          </FormGroup>
          
          <Row> <Col sm={6}></Col><Col sm={4}> <Button color="danger" type="submit" disabled={invalid}>Añadir</Button> </Col> </Row>
        </form>
      </div>
    );
  }
}

const filterSelector = formValueSelector("add-event");

const mapStateToProps = (state) => ({
  eventName: filterSelector(state, "eventName"),
  eventDate: filterSelector(state, "eventDate"),
  category: filterSelector(state, "category"),
  eventTime: filterSelector(state, "eventTime"),
  imgupload: filterSelector(state, "imgupload"),
  place: filterSelector(state, "place"),
  bidDate: filterSelector(state, "bidDate"),
  bidTime: filterSelector(state, "bidTime"),
  startBid: filterSelector(state, "startBid"),
  increment: filterSelector(state, "increment"),

  profile: state.profile,
  user: state.user,
});

const required = value => (value || typeof value === 'number' ? undefined : 'Required')
const isAfterToday = value => (moment(value).isAfter(new Date()) ? undefined : 'Date is before today') 


const validate = ({eventName, eventDate}) => ({
  eventName: required(eventName),
  eventDate: isAfterToday(eventDate) || required(eventDate),
});

const mapDispatchToProps = dispatch => ({
  postEvent: (data) => dispatch(postEvent(data)),
});

export default reduxForm({ form: "add-event", 
validate })

(connect(mapStateToProps,mapDispatchToProps)(AddEvent));