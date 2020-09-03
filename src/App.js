import React from 'react';
import './scss/main.scss';
import Home from './components/Home';
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';


function App() {
  return (
    <HashRouter>
      <>
        <Navigation/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/logout' component={Logout}/>
        </Switch>
      </>
    </HashRouter>
  );
}

export default App;
