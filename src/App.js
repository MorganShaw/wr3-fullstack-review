import React from 'react';
import './App.css';
import './reset.css';
import {Switch, Route, Link} from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import FrontPage from'./components/FrontPage';
import Header from './components/Header';
class App extends React.Component {
  render(){
    return <div>
      <Header/>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/front_page" component={FrontPage}/>
        <Route path="/profile" component={Profile}/>
      </Switch>
    </div>
  }
}

export default App;
