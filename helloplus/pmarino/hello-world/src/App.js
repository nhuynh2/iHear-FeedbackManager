import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  // sets up the state to display 'Hello World'
  const [showText, setShowText] = useState(false);

  // handles the button click event
  const handleClick = () => {
    setShowText(!showText); // toggles the visibility of 'Hello World'
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to my CS340 hello world program
        </p>
        <div className="app-container">
        <button onClick={handleClick} className='cool-button'>
          Click Me
        </button>
        {/* Conditionally render the 'Hello World' text */}
        <div className={`hello-text ${showText ? 'show' : ''}`}>
          Hello World
        </div>
      </div>
      </header>
    </div>
  );
}

export default App;
