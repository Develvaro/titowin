import React, { Component } from "react";
import { connect } from "react-redux";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import {
  fetchEventDetail,
  fetchPlace,
  fetchProfile,
  fetchEventBid,
} from '../actions';

import DetailBid from '../components/detailBid';


class EventDetail extends Component {

  constructor(props){
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab : '1'
    };

  }
    componentDidMount(){
      const idEvent = this.props.match.params.id;
      const { fetchEventBid, fetchEventDetail, fetchPlace } = this.props;
      fetchEventDetail(idEvent);
      //fetchEventBid(idEvent);
      
    }

    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }
    render() {

      console.log(this.props.eventDetail);
    return (
      <div>
        {this.props.eventDetail ? <DetailBid /> : "Cargando..."}

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
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        {
          this.props.profile ?
            <p> {this.props.profile.id} </p>
            : <p> Cargando... </p>   
        }
        {
          this.props.eventBids ?
            <p> EventBids </p>
            : <p> Cargando... </p>
        }
        {
          this.props.eventDetail ?
            <div>
              <p> {this.props.eventDetail.titulo}</p>
              <p> {this.props.eventDetail.categoria}</p>
              <p> {this.props.eventDetail.place.nombre}</p>
              <p> {this.props.eventDetail.titulo}</p>
            </div>
            : <p> Cargando... </p>
        }
        
      </div>
    );
  }
}



const mapStateToProps = (state) => ({
    eventDetail: state.eventDetail,
    place: state.place,
    profile: state.profile,
    eventBids: state.eventBids,
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    fetchEventDetail: (idEvent) => dispatch(fetchEventDetail(idEvent)),
    //fetchPlace: (idEvent) => dispatch(fetchPlace(idEvent)),
    //fetchEventBid: (idEvent) => dispatch(fetchEventBid(idEvent)), 
});

export default connect (mapStateToProps, mapDispatchToProps)(EventDetail);
