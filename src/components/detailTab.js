import React, {Component} from 'react';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import {connect} from 'react-redux';

class DetailTab extends Component{

    constructor(props){
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.createTable = this.createTable.bind(this);
        this.state = {
          activeTab : '1'
        };
    
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

      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

    render(){
        const {eventDetail} = this.props;
        return(
            <div>
                <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Detalles del Evento
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Estado de la Subasta
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm={{size:4 , offset: 2}}>
                <h4>Tab 1 Contents</h4>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    {eventDetail ? this.createTable() : "Cargando..."}

                                            
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
            </div>
        )}
}

const mapStateToProps = (state) => ({
    eventDetail: state.eventDetail,
    profile: state.profile,
    user: state.user,
  });

  export default connect (mapStateToProps, null)(DetailTab);
