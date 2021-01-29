import React from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

const App: React.FC<{}> = () =>  {

  const load = async () => {
    const response = await axios.get('/')
    return response.data
    
  }
  
  React.useEffect( () => {
    load().then(console.log)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
