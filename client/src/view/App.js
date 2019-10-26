import Login from './login/login';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Redirect} from "react-router-dom";
import Route from "react-router-dom/Route";
import Main from "./main/main";
import { authCheck } from '../helper/axiosRequest'

const App = () => {
  const [ user, setUser ] = useState(null);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const result = await authCheck();
        setUser(result.data);
      } catch (e) {
        console.log('request user error', e)
      }
    };
    checkLogin();
  }, []);
  return (
    <Router>
      <switch>
        <Route path='/' exact render={() => (
          user ? (<Main user={user}/> ) : (<Redirect to='/login' />)
        )} />
        <Route path='/login' exact render={() => (
          user ? (<Redirect to='/' />) : (<Login />)
        )} />
      </switch>
    </Router>
  )
};

export default App