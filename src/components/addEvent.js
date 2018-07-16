import React, {Component} from 'react';

import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class AddEvent extends Component {

    render(){
        return(
            <div>
                <Form>
                    <FormGroup row>
                    <Label for="name" sm={2}>Nombre del Evento</Label>
                    <Col sm={10}>
                        <Input type="text" name="eventName" id="name" placeholder="Madrid - Barcelona" />
                    </Col>
                    </FormGroup>

                    <FormGroup row>
                    <Label for="category" sm={2}>Categoría</Label>
                    <Col sm={10}>
                        <Input type="select" name="category" id="category" >
                            <option value="Concierto"></option>
                            <option value="Fútbol"></option>                            
                            <option value="Baloncesto"></option>
                        </Input>
                    </Col>
                    </FormGroup>

                    <FormGroup row>
                    <Label for="eventDate">Fecha del Evento</Label>
                    <Input type="date" name="eventDate" id="eventDate" />
                    </FormGroup>
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
                </Form>
            </div>
        )};

}

export default AddEvent;