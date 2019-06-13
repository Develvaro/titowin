import React, {Component} from 'react';
import moment from 'moment';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import {
  postValidatePlace, fetchEventBid, fetchProfile,
} from '../actions'
import ProfileNav from './profileNav';

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
import Spinner from 'react-spinner-material';


class AddPlace extends Component {

    
    componentDidMount() {
        if(this.props.user){
            this.props.fetchProfile(this.props.user);
        }
    }



    render(){
        const {postValidatePlace, handleSubmit, invalid} = this.props;

        return(
            <div>

                {
                    this.props.profile ? 
                        this.props.profile.tipo == "admin" ?
                            <form onSubmit={handleSubmit(postValidatePlace)}>
                            <FormGroup row> 
                                <Label for="email" sm={2}>
                                    Manager Email
                                    </Label>
                                    <Col sm={8}>
                                    <Field
                                        component={TextInput}
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder="example@domain.com"
                                    />
                                    </Col>
                                </FormGroup>
                                <FormGroup row> 
                                    <Label for="placename" sm={2}>
                                    Nombre del Manager
                                    </Label>
                                    <Col sm={8}>
                                    <Field
                                        component={TextInput}
                                        type="text"
                                        name="placename"
                                        id="placename"
                                        placeholder="Adolfo Bonilla"
                                    />
                                    </Col>
                                </FormGroup>


                                <FormGroup row> 
                                    <Label for="telefono" sm={2}>
                                    Teléfono
                                    </Label>
                                    <Col sm={8}>
                                    <Field
                                        component={TextInput}
                                        type="text"
                                        name="telefono"
                                        id="telefono"
                                        placeholder="+34 664332112"
                                    />
                                    </Col>
                                </FormGroup>

                                <FormGroup row> 
                                    <Label for="aforo" sm={2}>
                                    Aforo
                                    </Label>
                                    <Col sm={8}>
                                    <Field
                                        component={NumberInput}
                                        type="number"
                                        name="aforo"
                                        id="aforo"
                                        placeholder="1000"
                                    />
                                    </Col>
                                </FormGroup>

                                <FormGroup row> 
                                    <Label for="photo" sm={2}>
                                    Foto del lugar
                                    </Label>
                                    <Col sm={8}>
                                    <Field
                                        component={FileInput}
                                        type="file"
                                        name="photo"
                                        id="photo"
                                    />
                                    </Col>
                                </FormGroup>

                                <FormGroup row> 
                                    <Label for="lat" sm={2}>
                                    Lat
                                    </Label>
                                    <Col sm={8}>
                                    <Field
                                        component={TextInput}
                                        type="text"
                                        name="lat"
                                        id="lat"
                                        placeholder="-47.3"
                                    />
                                    </Col>
                                </FormGroup>

                                <FormGroup row> 
                                    <Label for="lon" sm={2}>
                                    Lon
                                    </Label>
                                    <Col sm={8}>
                                    <Field
                                        component={TextInput}
                                        type="text"
                                        name="lon"
                                        id="lon"
                                        placeholder="5.3"
                                    />
                                    </Col>
                                </FormGroup>
                                <FormGroup row> 
                                    <Label for="files" sm={2}>
                                    Ficheros para demostrar propiedad
                                    </Label>
                                    <Col sm={8}>
                                    <Field
                                        component={FileInput}
                                        type="file"
                                        name="files"
                                        id="files"
                                        placeholder="Todo lo necesario para demostrar que tienes permisos en el lugar."
                                    />
                                    </Col>
                                </FormGroup>
                                <Row> <Col sm={6}></Col><Col sm={4}> <Button color="danger" type="submit" /*disabled={invalid}*/>Añadir</Button> </Col> </Row>

                            </form>
                    
                        :
                        <p>You should not be here</p>
                    :
                    <p align="center"><Spinner size={40} spinnerColor={"#e91e63"} spinnerWidth={1} visible={true} /></p>                 
                }
                    

            </div>        
        )};

}

const filterSelector = formValueSelector("add-place");


const mapStateToProps = (state) => ({
    placename: filterSelector(state, "placename"),
    aforo: filterSelector(state, "aforo"),
    photoURL: filterSelector(state, "photoURL"),
    lat: filterSelector(state, "lat"),
    lon: filterSelector(state, "lon"),
    manager: filterSelector(state, "manager"),
    email: filterSelector(state,"email"),
    telefono: filterSelector(state,"telefono"),
    files: filterSelector(state, "files"),
    profile: state.profile,
    user: state.user,
  });
  

const mapDispatchToProps = dispatch => ({
    postValidatePlace: (data) => dispatch(postValidatePlace(data)),
    fetchProfile: (user) => dispatch(fetchProfile(user))
  });
  
  export default reduxForm({ form: "add-event" })
  
  (connect(mapStateToProps,mapDispatchToProps)(AddPlace));