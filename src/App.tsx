import React from 'react';
import logo from './logo.svg';
import './App.css';
import FeatureToggleProvider from './context/featureToggles'
import RedThings from './components/RedThings'
import UserContextProvider, {UserContext} from './context/userContext'
import GreenCircle from './components/GreenCircle'

const UserComponent: React.FC<{}> = () => {
  const {userId, setUserId} = React.useContext(UserContext)
  return <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)}/>
}

const App = () => {

  return (
    <UserContextProvider>
      <FeatureToggleProvider>
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
            <UserComponent />
            <RedThings/>
            <GreenCircle />
          </header>
          
        </div>
      </FeatureToggleProvider>
    </UserContextProvider>
  );
}

export default App;
