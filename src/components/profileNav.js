import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'reactstrap';

class ProfileNav extends Component {



    render(){
        return(
            <div>
            <ListGroup>
                <Link to="/profile/"><ListGroupItem color="success">Perfil</ListGroupItem></Link>
                <Link to="/profile/bids/"><ListGroupItem color="success">Mis Pujas</ListGroupItem></Link>
                <Link to="/profile/sponsors"><ListGroupItem color="success">Mis Anuncios</ListGroupItem></Link>
            </ListGroup>
        </div>
        )};

}

export default ProfileNav;