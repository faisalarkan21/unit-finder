import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import DetailUnit from './pages/Home/DetailUnit';
import configureStore from './store/configureStore';
import Home from './pages/Home/IndexHome';

const store = configureStore();

function Root() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/detail" component={DetailUnit} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default Root;
