import React from 'react';

import styled from 'styled-components';

import Card from './card';

const CardList = ({events}) => (
    <div>{events.map(event => <Card {...event} /> )}</div>
);

export default CardList;