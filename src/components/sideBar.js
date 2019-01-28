import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {connect} from 'react-redux';
import { fetchProfile } from '../actions'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

class SideBar extends Component {
    
    componentDidMount(){
        if (this.props.user){
            this.props.fetchProfile(this.props.user);
        }
    }

    render(){
        const {selected, user, profile} = this.props;
        return( 

<div>

<Router>
    <Route render={({ location, history }) => (
        <React.Fragment>
            <SideNav
                onSelect={(selected) => {
                    switch(selected){
                        case 'profile':

                        break;

                        case '':

                        break;

                    }

                    const to = '/' + selected;
                    if (location.pathname !== to) {
                        history.push(to);
                    }
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="profile">
                
                <NavItem eventKey="profile">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        <Link to="/profile/">Perfil
                        </Link>
                    </NavText>
                </NavItem>

                    <NavItem eventKey="devices">
                        <NavIcon>
                            <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Devices
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
            <main>

            </main>
        </React.Fragment>
    )}
    />
</Router>


</div>
    )};

}


const mapStateToProps = (state) => ({
    profile: state.profile,
    user: state.user,
  });

const mapDispatchToProps = (dispatch) => ({
    fetchProfile: (user) => dispatch(fetchProfile(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
