import React from 'react';
import Home from './components/Home/Home'
import Dict from './components/Dict/Dict'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import data from './components/data/dictList.json'

import './App.scss';

function App() {
  //load data into localstorage
  if(!localStorage.getItem('data')) {
    localStorage.setItem('data', JSON.stringify(data.dataList));
  }
  return (
    <Router>
      <div className="App">
        <div className="App-body">
          <Route exact path="/dict/:id" component={Dict} />
          <Route exact path="/" component={Home} />
        </div>
      </div>
    </Router>
    
  );
}

export default App;
