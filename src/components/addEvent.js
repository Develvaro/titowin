import React, { Component } from "react";

import { Field, reduxForm } from "redux-form";

import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

import TextInput from "./form/textinput";
import Select from "./form/select";
import DatePicker from "./form/datepicker";

class AddEvent extends Component {
  render() {
    return (
      <div>
        <Form>
          <FormGroup row>
            <Label for="name" sm={2}>
              Nombre del Evento
            </Label>
            <Col sm={10}>
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
            <Col sm={10}>
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
            <Label for="eventDate">Fecha del Evento</Label>
            <Field name="eventDate" id="eventDate" component={DatePicker} />
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default reduxForm({ form: "add-event" })(AddEvent);

/*

                    

                    <FormGroup row>
                    <Label for="eventTime">Hora del evento</Label>
                    <Input type="time" name="time" id="eventTime" />
                    </FormGroup>
                    
                    <FormGroup row>
                    <Label for="bidDate">Fecha de fin de Puja</Label>
                    <Input type="date" name="bidDate" id="bidDate" />
                    </FormGroup>
                    <FormGroup row>
                    <Label for="bidTime">Hora de fin de Puja</Label>
                    <Input type="time" name="bidTime" id="bidTime" />
                    </FormGroup>

                    <FormGroup row>
                    <Label for="initialBid">Puja Inicial</Label>
                    <Input type="number" name="initialBid" id="initialBid" placeholder="2000" />
                    </FormGroup>

                    <FormGroup row>
                    <Label for="incBid">Incremento de Puja</Label>
                    <Input type="number" name="incBid" id="incBid" placeholder="200" />
                    </FormGroup>
                    */
