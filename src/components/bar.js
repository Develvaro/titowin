import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

import React from 'react';
import {connect} from 'react-redux';
import {login, logout, fetch_profile} from '../actions'

const Bar = ({login, logout, user}) => (
    <div>
        <Navbar color="danger" light expand="md">
          <NavbarBrand className="text-white" href="/">TitoWin</NavbarBrand>
          <NavbarToggler /*onClick={}*/ />
          <Collapse /*isOpen={}*/ navbar>
            <Nav className="ml-auto" navbar>
              {user ?
                <NavItem>
                  <NavLink className="text-white" href="/profile">{user.displayName}</NavLink>
                </NavItem> : <span></span>
              }

              <NavItem>
                {!user ? 
                    <NavLink className="text-white" href="#" onClick={login}>  Acceder</NavLink>
                    : <NavLink className="text-white" href="#" onClick={logout}> Salir </NavLink> 
                }
              </NavItem>
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
)

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
});

export default connect(mapStateToProps,mapDispatchToProps)(Bar);