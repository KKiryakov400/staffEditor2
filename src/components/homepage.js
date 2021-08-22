import React from 'react';
import ReactDOM from 'react-dom';

import ToolBar from './toolbar';
import {Link}  from 'react-router-dom';
import {HomeMenu} from './nav';
import store from '../store/store';
import {byField} from '../config/functions';
import {lexiconRoles} from '../config/appconfig';


class ListItem extends React.Component{
  constructor(props) {
      super(props);
    }
  render(){
    let archClassName;
    if (this.props.arch){archClassName="archRow"}else{archClassName=""}
    let roleLocal=lexiconRoles[this.props.role]['ru'];
    return (
      <li className={archClassName}>
            <Link to={{pathname: "/edit-employee", employeeId: this.props.ide}}>
                          <span>{this.props.name}</span>
                          <span>{roleLocal}</span>
                          <span>{this.props.phone}</span>
            </Link>
      </li>);
  }
}


export default class Homepage  extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        staff: store.getState().staff,
        filterstaff: store.getState().staff.filter(function(item){
          return item.isArchive == false;
        }),
        filterrole: "all",
        filterarchive: false,
        sorttype: "id"
      }

      this.filterList = this.filterList.bind(this);
      this.setfilterarchive = this.setfilterarchive.bind(this);
      this.setfilterrole = this.setfilterrole.bind(this);
      this.render = this.render.bind(this);
      this.setsort = this.setsort.bind(this);

      store.subscribe(() => {
        this.setState({ staff: store.getState().staff },()=>this.filterList());
        });
      }

      setsort(field){
        this.setState({sorttype: field},()=>this.filterList());
      }
      setfilterarchive(ischecked){
        this.setState({filterarchive: ischecked},()=>this.filterList());
      }
      setfilterrole(role){
        this.setState({filterrole: role},()=>this.filterList());
      }


      filterList(){
        if (this.state.filterarchive){
          filteredListStep1 = this.state.staff;
        }
        else  {
          var filteredListStep1 = this.state.staff.filter(function(item){
            return item.isArchive == false;
          });
        }
        switch(this.state.filterrole) {
            case 'driver': {
                var filteredListStep2 = filteredListStep1.filter(function(item){
                  return item.role == 'driver';
                });
                break;
            }
            case 'cook': {
                var filteredListStep2 = filteredListStep1.filter(function(item){
                  return item.role == 'cook';
                });
                break;
            }
            case 'waiter': {
                var filteredListStep2 = filteredListStep1.filter(function(item){
                  return item.role == 'waiter';
                });
                break;
            }
            default:{filteredListStep2 = filteredListStep1; break;}
          }
        filteredListStep2.sort(byField(this.state.sorttype));
        this.setState({filterstaff: filteredListStep2},()=>this.render())
      }

  render(){
    return (
      <div>
        <HomeMenu />
        <h2>Список сотрудников</h2>
        <ToolBar  setfilterarchive={this.setfilterarchive}
                  setfilterrole={this.setfilterrole}
                  setsort={this.setsort}
                  sortactive={this.state.sorttype}
                  arch={""}
                  />
        <ul className="staffList">
          {this.state.filterstaff.map(item =>{ return <ListItem
                                        key={item.id}
                                        ide={item.id}
                                        name={item.name}
                                        role={item.role}
                                        phone={item.phone}
                                        arch={item.isArchive}/>
                                      })}
        </ul>
      </div>
    );
  }
}
