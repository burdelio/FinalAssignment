import { StrictMode, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Providers from './providers/Providers'
import App from './App'
import './main.css'

import LoginForm from './forms/loginPage'

const isLogged = () => {
  return sessionStorage.getItem('logged');
};

function MainApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(isLogged);

  const saveUser = () => {
    sessionStorage.setItem('logged', true);
    setIsLoggedIn(true);
  };

  return (
    <StrictMode>
      {!isLoggedIn
        ? <LoginForm saveUser={saveUser} />
        : <Providers><App /></Providers>
      }
    </StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('todo')).render(
  <MainApp />
);