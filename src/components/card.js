import React from 'react';

import styled from 'styled-components';

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
        <Container>
            <Imagen url={urlPhoto} />
            <span> <strong>Evento: </strong> {titulo} </span>
            <span> <strong>Categoría: </strong> {categoria} </span>
            <span> <strong>Fecha: </strong> {fecha} </span>
            <span> <strong>Lugar: </strong> {lugar} </span>
        </Container>
    );
}

export default Card;