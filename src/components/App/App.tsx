import React from 'react';

import Main from '../Main/Main';
import SideBar from '../SideBar/SideBar';

import Header from './Header';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="AppContainer">
        <Main />
        <SideBar />
      </div>
    </div>
  );
}

export default App;
