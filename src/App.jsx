import { useContext } from 'react';
import AuthContext from './providers/Auth';
import LoginForm from './forms/loginPage'
import MainLayout from './MainLayout';

import './App.css'

const App = () => {
  const { isLoggedIn, toggleLoggedIn } = useContext(AuthContext);

  return (<>
    {!isLoggedIn
      ? <LoginForm saveUser={toggleLoggedIn} />
      : <MainLayout />
    }
  </>);
};

export default App;