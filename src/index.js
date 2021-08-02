// branch version 1
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

import { Header } from "./components/Header"
import { Home } from "./components/Home"
import { Registration } from "./components/Registration"
import { RegisterSuccess } from "./components/RegisterSuccess"
import { render } from 'react-dom';

class App extends React.Component {
  render(){
    return(
      <main>
        <Header/>
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/Home" component={Home} exact />
            <Route path="/Register" component={Registration} />
            <Route path="/RegisterSuccess" component={RegisterSuccess} />
        </Switch>
    </main>
    )
  }
}

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , window.document.getElementById('app'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
