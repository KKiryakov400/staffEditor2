import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';


import store from '../store/store';

import Homepage from './homepage';
import {NewEmployee,EditEmployee} from './employeepage';
//import NotFound from './notfound';
import { DeleteResult,AddResult,EditResult,NotFound } from './result';

class App extends React.Component{

  render(){
      return (
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/add-employee" component={NewEmployee} />
              <Route exact path="/edit-employee" component={EditEmployee} />
              <Route exact path="/delete" component={DeleteResult} />
              <Route exact path="/add" component={AddResult} />
              <Route exact path="/edit" component={EditResult} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>

      );
    }
}

export default App;
