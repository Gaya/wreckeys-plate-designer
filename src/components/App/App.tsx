import React from 'react';

import Main from '../Main/Main';
import SideBar from '../SideBar/SideBar';

import Header from './Header';

import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="AppContainer">
        <Main />
        <SideBar />
      </div>
      <Header />
    </div>
  );
}

export default App;
