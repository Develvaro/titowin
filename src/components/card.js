import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import moment from 'moment';

moment.locale("es");

const Container = styled.div`
    width: 250px; 
    height: 400px;
    border: 1px solid black;
    `;

const Imagen = styled.div`
    height: 160px;
    background-image : url(${props => props.url});
    background-size: cover;
    background-repeat: no-repeat;
`;

const Card = ( {titulo, categoria, fecha, lugar, pujaActual, id, urlPhoto} ) => {

    return(
        <Link to={`/event/${id}`}>
        <Container>
            <Imagen url={urlPhoto} />
            <span> <strong>Evento: </strong> {titulo} </span>
            <span> <strong>Categoría: </strong> {categoria} </span>
            <span> <strong>Fecha: </strong> {moment(fecha).format('MMMM Do YYYY, h:mm:ss a')} </span>
            <span> <strong>Lugar: </strong> {lugar} </span>
        </Container>
        </Link>
    );
}

export default Card;