import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');
const Container = styled.div`
    flex: 1;
    min-width: 25%;
    width: 300px; 
    height: 500px;
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

const SponsorCard = ( {titulo, url, urlPhoto, id, validado} ) => {
    return(
        <span>
            {id ? 
            <Link to={`/profile/sponsors/detail/${id}`}>
            <Container>
                <Imagen url={urlPhoto} />
                <span> <strong>Nombre: </strong> {titulo} </span>
                <br />

            </Container>
            </Link> :
                <Container>
                    <Imagen url={urlPhoto} />
                        <span> <strong>Nombre: </strong> {titulo} </span>
                        <br />
                        <a href={url} > <strong> URL </strong>  </a>
                        <br />
                        <strong>Estado : {validado ? <em>Validado</em> : <em>No Validado</em>}</strong>
                </Container>
            }

        </span>
    );
}

//'MMMM Do YYYY, h:mm:ss a'
export default SponsorCard;