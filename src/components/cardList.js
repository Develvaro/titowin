import React from 'react';

import styled from 'styled-components';

import Card from './card';

const CardList = ({events}) => (
    <div>{events.map(event => <Card {...event}  key={event.id}/> )}</div>
);

export default CardList;