import React from 'react';
import {connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class SearchBar extends Component {

    constructor(){
        
    }
    render(){
        return(
            <div>
            
            <Input type="select" name="city" id="exampleSelect">
            <option value="cordoba">cordoba</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
            </div>
        )};
}

export default SearchBar;