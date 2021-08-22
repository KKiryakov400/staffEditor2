import React from 'react';
import ReactDOM from 'react-dom';
import {lexiconRoles,lexiconSorts} from '../config/appconfig';



export default class ToolBar extends React.Component{
  constructor(props) {
    super(props);
    this.CheckboxActive = React.createRef();
    this.state = {checked: this.props.arch};
  }
  render(){

    return (
      <div className="toolBar">
          <div className="filterBar">
          <div className="tool">
            <RoleSelect
                        change={this.props.setfilterrole} />
          </div>
          <div className="tool">
            <label>
              <input  ref="CheckboxActive"
                      type="checkbox"
                      checked={this.state.checked}
                      onChange={(e)=>{
                        this.props.setfilterarchive(this.refs.CheckboxActive.checked);
                        if(this.refs.CheckboxActive.checked)
                        {
                          this.setState({checked: "checked"});
                        }
                        else{this.setState({checked: ""});}
                      }}/>
              <span>в архиве</span>
            </label>
          </div>
          </div>
          <div className="tool sort">
          <SortSelect act={this.props.sortactive}
                      change={this.props.setsort}/>
          </div>
      </div>
    );
  }
}



class SortSelect extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    var options =[];

    for(let item in lexiconSorts) {
      let sele = '';
      if(lexiconSorts[item].en==this.props.act){sele = 'selected';}
      options.push(<option key={lexiconSorts[item].en} value={lexiconSorts[item].en} selected={sele}>{lexiconSorts[item].ru}</option>);
      }
    return (
      <label>
      <span>Сортировка: </span>
      <select onChange={(e)=>{this.props.change(e.target.value)}}>
        {options}
      </select>
    </label>
    );
  }
}

class RoleSelect extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
      var options =[];
      for(let item in lexiconRoles) {
        options.push(<option key={lexiconRoles[item].en} value={lexiconRoles[item].en}>{lexiconRoles[item].ru}</option>);
        }
    return (
      <label>
      <span>Показать: </span>
      <select onChange={(e)=>{this.props.change(e.target.value)}}>
        <option value="all">все</option>
        {options}
      </select>
      </label>
    );
  }
}
