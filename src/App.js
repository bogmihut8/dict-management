import React from 'react';
import { Container } from '@material-ui/core';
import Header from './components/Header/Header'
import DictList from './components/DictList/DictList'

import './App.scss';

function App() {
  return (
      <div className="App-body">
        <Container maxWidth="md">
          <Header/>
          <DictList />
        </Container>
      </div>
  );
}

export default App;
