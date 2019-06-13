import React, {Component} from 'react';
import { Field, reduxForm } from "redux-form";
import { formValueSelector } from "redux-form";
import { connect } from "react-redux";

import {
    Row,
    Col,
    Button,
    FormGroup,
    Label,
  } from "reactstrap";

import {
   postEventPrize ,
} from '../../actions'

import TextInput from "../../components/form/textinput";
import NumberInput from"../../components/form/numberinput";
class AddPrize extends Component{


    render(){
        const { handleSubmit, profile} = this.props;
        if(profile.tipo == "manager"){
            return(
                <div>
                    <form onSubmit={handleSubmit}>
                        <FormGroup row> 
                            <Label for="prizeName" sm={2}>
                            Nombre del premio
                            </Label>
                            <Col sm={8}>
                            <Field
                                component={TextInput}
                                type="text"
                                name="prizeName"
                                id="prizeName"
                                placeholder="Iphone X - 64gb"
                            />
                            </Col>
                        </FormGroup>
    

    
                        <FormGroup row>
                            <Label for="prizeDescription" sm={2}>
                            Descripción del premio
                            </Label>
                            <Col sm={8}>
                            <Field
                                component={TextInput}
                                type="text"
                                name="prizeDescription"
                                id="prizeDescription"
                            />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="prizePrice" sm={2}>
                            Precio del producto
                            </Label>
                            <Col sm={8}>
                            <Field
                                component={NumberInput}
                                type="text"
                                name="prizePrice"
                                id="prizePrice"
                                placeholder="800€"
                            />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="prizePickPlace" sm={2}>
                            Indicaciones para recoger
                            </Label>
                            <Col sm={8}>
                            <Field
                                component={TextInput}
                                type="text"
                                name="prizePickPlace"
                                id="prizePickPlace"
                            />
                            </Col>
                        </FormGroup>
    
                        <Row> <Col sm={6}></Col><Col sm={4}> <Button color="danger" type="submit" /*disabled={invalid}*/>Añadir</Button> </Col> </Row>
    
                    </form>
                    
                </div>
                )
        } 
        else{
            return(
                <div>...</div>
            )
        }
        
       
    }
}

const filterSelector = formValueSelector("addprize");


const mapStateToProps = (state) => ({
    prizeName: filterSelector(state, "eventName"),
    prizePrice: filterSelector(state, "prizePrize"),
    prizeDescription: filterSelector(state, "prizeDescription"),
  
    profile: state.profile,
    user: state.user,
  });

const mapDispatchToProps = dispatch => ({
    postEventPrize: (data) => dispatch(postEventPrize(data)),
});

export default reduxForm({
    form: "addprize",
    enableReinitialize: true
  })(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(AddPrize)
  );
  