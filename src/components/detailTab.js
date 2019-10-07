import React, {Component} from 'react';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Table } from 'reactstrap';
import {connect} from 'react-redux';
import styled from 'styled-components';


const Container = styled.div`
    flex: 1;
    min-width: 25%;
    width: 250px; 
    height: 400px;

    margin:5px; 
    @media (max-width: 700px) {
          min-width: 33.33%; 
      }
    `;
class DetailTab extends Component{

    constructor(props){
        super(props);
  
        this.createTable = this.createTable.bind(this);
      }

      createTable = () => {
        let table = []
        const {eventDetail} = this.props;
        // Outer loop to create parent
        let title = [];
        let header = [];
        title.push(<td></td>)
        title.push(<td>Pujas</td>)
        title.push(<td></td>)
        header.push(<td>Usuario</td>);
        header.push(<td>Cantidad</td>);
        header.push(<td>Puesto</td>);
        table.push(<tr>{title}</tr>)
        table.push(<tr>{header}</tr>);
        for (let i = 0; i <= eventDetail.participaciones; i++) {

          if(eventDetail.bids[i].cantidad >= eventDetail.startBid)
          {
            let children = []
            //Inner loop to create children 
              children.push(<td>{eventDetail.bids[i].email}</td>);
              children.push(<td>{eventDetail.bids[i].cantidad}</td>);
              children.push(<td>{i + 1}</td>);
  
            //Create the parent and add the children
            table.push(<tr>{children}</tr>)
          }

        }
        return table
      }



    render(){
        const {eventDetail} = this.props;
        return(
        <Container>

                    {eventDetail ? <Table striped> {this.createTable() } </Table>: "Cargando..."}

                                            

        </Container>
        )}
}

const mapStateToProps = (state) => ({
    eventDetail: state.eventDetail,
    profile: state.profile,
    user: state.user,
  });

  export default connect (mapStateToProps, null)(DetailTab);
