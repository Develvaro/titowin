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
                {profile && ( profile.tipo == "empresa" ) && 
                        <div>
                            <Link to="/profile/bids/"><ListGroupItem className={selected == "bids" ? "text-white bg-danger" : "text-white bg-dark"}>Mis Pujas</ListGroupItem></Link>
                            <Link to="/profile/sponsors"><ListGroupItem className={selected == "sponsors" ? "text-white bg-danger" : "text-white bg-dark"}>Mis Anuncios</ListGroupItem></Link>
                            <Link to ="/profile/sponsors/add"><ListGroupItem className={selected == "addsponsor" ? "text-white bg-danger" : "text-white bg-dark"}> Subir Anuncio</ListGroupItem> </Link>

                        </div>
                }


                {profile && ( profile.tipo == "manager") &&
                    <div>
                        <Link to ="/manage/myevents"><ListGroupItem className={selected == "myevents" ? "text-white bg-danger" : "text-white bg-dark"}>Mis Eventos</ListGroupItem> </Link>
                        <Link to ="/manage/addevent"><ListGroupItem className={selected == "addevent" ? "text-white bg-danger" : "text-white bg-dark"}>Añadir Evento</ListGroupItem> </Link>
                        <Link to ="/manage/deleteevent"><ListGroupItem className={selected == "deleteevent" ? "text-white bg-danger" : "text-white bg-dark"}>Eliminar Eventos</ListGroupItem> </Link>
                    </div>
                }

                {profile && (profile.tipo == "admin" ) && 
            
                <div>
                    <Link to ="/admin/validatesponsors"><ListGroupItem className={selected == "validatesponsors" ? "text-white bg-danger" : "text-white bg-dark"}>Validar Sponsors</ListGroupItem> </Link>
                    <Link to ="/admin/addplaceandmanager"><ListGroupItem className={selected == "addplaceandmanager" ? "text-white bg-danger" : "text-white bg-dark"}>Añadir Lugar y Manager</ListGroupItem></Link>
                    <Link to ="/admin/validatecompany"><ListGroupItem className={selected == "validatecompany" ? "text-white bg-danger" : "text-white bg-dark"}>Validar Empresa</ListGroupItem></Link>
                </div>    
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
