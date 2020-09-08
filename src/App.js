import React, {Component} from 'react';
import './scss/main.scss';
import getDataFromAPI from "./components/api/GetDataFromAPI";
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


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLogged: false
    }
  };

  changeLogStatus = (value) => {
    this.setState({isLogged: value});
  }

  componentDidMount() {
    getDataFromAPI('/home').then(state => {
    console.log(state);
    this.setState(state);
    });
}

  render() {
    return (
      <HashRouter>
        <>
          <Navigation isLogged={this.state.isLogged}/>
          <Switch>
            <Route exact path='/' render={(props) => (
              <Home {...props} isLogged={this.state.isLogged} />)}/>
            <Route path='/login' render={(props) => (
              <Login {...props} changeLogStatus={this.changeLogStatus} isLogged={this.state.isLogged} />)}/>
            <Route path='/register' render={(props) => (
              <Register {...props} changeLogStatus={this.changeLogStatus} isLogged={this.state.isLogged} />)}/>
            <Route path='/logout' render={(props) => (
              <Logout {...props} changeLogStatus={this.changeLogStatus} isLogged={this.state.isLogged} />)}/>
          </Switch>
        </>
      </HashRouter>
    );
  }
}

export default App;
