import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './Components/SearchBar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      <SearchBar />
      </header>
    </div>
  );
}

export default App;
