import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');
const Container = styled.div`
    flex: 1;
    min-width: 25%;
    width: 284px; 
    height: 400px;
    border: 1px solid black;

    margin:5px; 
    @media (max-width: 700px) {
          min-width: 33.33%; 
      }
    `;

const Imagen = styled.div`
    height: 160px;
    background-image : url(${props => props.url});
    background-size: cover;
    background-repeat: no-repeat;
`;

const Card = ( {titulo, categoria, fecha, place, pujaActual, id, urlPhoto} ) => {
    return(
        <span>
            <Link to={`/event/${id}`}>
            <Container>
                <Imagen url={urlPhoto} />
                <span> <strong>Evento: </strong> {titulo} </span>
                <br/>

                <span> <strong>Categoría: </strong> {categoria} </span>
                <br/>

                <span> <strong>Fecha: </strong> {moment.unix(fecha.seconds).locale('es').format('LLLL')} </span>
                <br/>

                <span> <strong>Lugar: </strong> {place.nombre} </span>
                <br/>

            </Container>
            </Link>
        </span>
    );
}

//'MMMM Do YYYY, h:mm:ss a'
export default Card;