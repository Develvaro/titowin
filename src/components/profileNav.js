import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'reactstrap';

class ProfileNav extends Component {

    render(){
        const {selected} = this.props;
        return(
            <div>
            <ListGroup>
                <Link to="/profile/"><ListGroupItem color={selected == "profile" ? "success" : ""}>Perfil</ListGroupItem></Link>
                <Link to="/profile/bids/"><ListGroupItem color={selected == "bids" ? "success" : ""}>Mis Pujas</ListGroupItem></Link>
                <Link to="/profile/sponsors"><ListGroupItem color={selected == "sponsors" ? "success" : ""}>Mis Anuncios</ListGroupItem></Link>
                <Link to ="/profile/addsponsor"><ListGroupItem color={selected == "addsponsor" ? "success" : ""}> Subir Anuncio</ListGroupItem> </Link>
            </ListGroup>
        </div>
        )};

}

export default ProfileNav;