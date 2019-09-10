import React from 'react';
import { Container } from '@material-ui/core';
import Header from '../Header/Header'
import DictList from '../DictList/DictList'

import './Home.scss';

function Home() {
  return (
    <Container maxWidth="md">
      <Header/>
      <DictList />
    </Container>
  );
}

export default Home;

