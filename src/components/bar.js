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
import {login, logout} from '../actions'

const Bar = ({login, logout, user}) => (
    <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">TitoWin</NavbarBrand>
          <NavbarToggler /*onClick={}*/ />
          <Collapse /*isOpen={}*/ navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                {!user ? 
                    <NavLink href="#" onClick={login}> Acceder </NavLink>
                    : <p>{user.displayName} <NavLink href="#" onClick={logout}> Salir </NavLink> </p>
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