import React, {Component} from 'react';

import classnames from 'classnames';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Card from './card';

const Container = styled.div`
    flex: 2;
    min-width: 25%;
    width: 250px; 
    height: 400px;

    margin:5px; 
    @media (max-width: 700px) {
          min-width: 33.33%; 
      }
    `;

class DetailBidEvent extends Component{

    constructor(props){
        super(props);
    
        this.createTable = this.createTable.bind(this);
        }

        createTable = () => {
        let table = []
        const {eventDetail} = this.props;
        // Outer loop to create parent
        let header = [];
        
        header.push(<td>Usuario</td>);
        header.push(<td>Cantidad</td>);
        header.push(<td>Puesto</td>);
        table.push(<tr>{header}</tr>);
        for (let i = 0; i <= eventDetail.participaciones; i++) {
            let children = []
            //Inner loop to create children 
            children.push(<td>{eventDetail.bids[i].email}</td>);
            children.push(<td>{eventDetail.bids[i].cantidad}</td>);
            children.push(<td>{i + 1}</td>);

            //Create the parent and add the children
            table.push(<tr>{children}</tr>)
        }
        return table
        }



    render(){
        const {eventDetail} = this.props;
        return(
                        <Card {...eventDetail }/>
        )}
}

const mapStateToProps = (state) => ({
    eventDetail: state.eventDetail,

    });

    export default connect (mapStateToProps, null)(DetailBidEvent);