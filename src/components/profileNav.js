import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'reactstrap';
import {connect} from 'react-redux';
import { fetchProfile } from '../actions'
class ProfileNav extends Component {
    
    componentDidMount(){
        if (this.props.user){
            this.props.fetchProfile(this.props.user);
        }
    }

    render(){
        const {selected, user, profile} = this.props;
        return( 
            <div>
            <ListGroup>
                <Link to="/profile/" ><ListGroupItem className={selected == "profile" ? "text-white bg-danger" : "text-white bg-dark"} >Perfil</ListGroupItem></Link>
                <Link to="/profile/bids/"><ListGroupItem className={selected == "bids" ? "text-white bg-danger" : "text-white bg-dark"}>Mis Pujas</ListGroupItem></Link>
                <Link to="/profile/sponsors"><ListGroupItem className={selected == "sponsors" ? "text-white bg-danger" : "text-white bg-dark"}>Mis Anuncios</ListGroupItem></Link>
                <Link to ="/profile/addsponsor"><ListGroupItem className={selected == "addsponsor" ? "text-white bg-danger" : "text-white bg-dark"}> Subir Anuncio</ListGroupItem> </Link>

                {profile && ( profile.tipo == "manager" || profile.tipo == "admin" ) &&
                    <div>

                                <Link to ="/manage/event/add"><ListGroupItem className={selected == "addsponsor" ? "text-white bg-danger" : "text-white bg-dark"}>Añadir Evento</ListGroupItem> </Link>
                                <Link to ="/manage/event/delete"><ListGroupItem className={selected == "addsponsor" ? "text-white bg-danger" : "text-white bg-dark"}>Eliminar Eventos</ListGroupItem> </Link>
                                <Link to ="/manage/event/validate"><ListGroupItem className={selected == "addsponsor" ? "text-white bg-danger" : "text-white bg-dark"}>Validar Publicidad</ListGroupItem> </Link>
                    </div>
                }

                {profile && (profile.tipo = "admin" ) && 
            
                    <Link to ="/admin/user/manage"><ListGroupItem className={selected == "addsponsor" ? "text-white bg-danger" : "text-white bg-dark"}>Validar Usuarios</ListGroupItem> </Link>

                }


            </ListGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNav);
