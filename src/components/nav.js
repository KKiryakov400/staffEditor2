import React from 'react';
import ReactDOM from 'react-dom';

import {Link}  from 'react-router-dom';


class HomeMenu extends React.Component{
  render(){
    return (
      <div className="mainMenu">
                <Link to="/add-employee">Добавить нового сотрудника</Link>
      </div>
    );
  }
}

class EmplMenu extends React.Component{
  render(){
    return (
      <div className="mainMenu">
                <Link to="/">К списку сотрудников</Link>
      </div>
    );
  }
}


export {HomeMenu,EmplMenu}
