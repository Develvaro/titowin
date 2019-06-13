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
    border: 2px solid ${props => props.borderColor};

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

const CardManage = ( {titulo, categoria, fecha, borderColor, id, urlPhoto} ) => {
    return(
        <span>
            <Link to={`/manage/event/${id}`}>
            <Container borderColor={borderColor}>
                <Imagen url={urlPhoto} />
                <span> <strong>Evento: </strong> {titulo} </span>
                <br/>
                <span> <strong>Categoría: </strong> {categoria} </span>
                <br/>

                <span> <strong>Fecha: </strong> {moment.unix(fecha.seconds).locale('es').format('LLLL')} </span>
                <br/>

            </Container>
            </Link>
        </span>
    );
}

//'MMMM Do YYYY, h:mm:ss a'
export default CardManage;