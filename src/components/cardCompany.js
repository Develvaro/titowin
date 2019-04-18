import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');
const Container = styled.div`
    flex: 1;
    min-width: 25%;
    width: 250px; 
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

const CardCompany = ( {titulo, categoria, fecha, place, id, urlPhoto, ticket, link} ) => {

    return(
        <span>
            {
                link ? <Link to={`/profile/wonevent/${ticket}`}>
                <Container>
                    <Imagen url={urlPhoto} />
                    <span> <strong>Evento: </strong> {titulo} </span>
                    <span> <strong>Categoría: </strong> {categoria} </span>
                    <span> <strong>Fecha: </strong> {moment.unix(fecha.seconds).locale('es').format('LLLL')} </span>
                    {place ? <span> <strong>Lugar: </strong> {place.nombre} </span> : ""}
                </Container>
                </Link>
                :                 <Container>
                <Imagen url={urlPhoto} />
                <span> <strong>Evento: </strong> {titulo} </span>
                <span> <strong>Categoría: </strong> {categoria} </span>
                <span> <strong>Fecha: </strong> {moment.unix(fecha.seconds).locale('es').format('LLLL')} </span>
                {place ? <span> <strong>Lugar: </strong> {place.nombre} </span> : ""}
            </Container>
            }

        </span>
    );
}

//'MMMM Do YYYY, h:mm:ss a'
export default CardCompany;