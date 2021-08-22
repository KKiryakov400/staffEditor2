import React from 'react';
import ReactDOM from 'react-dom';
import MaskedInput from 'react-maskedinput';
import {lexiconRoles} from '../config/appconfig';



class EmployeeRoleSelect extends React.Component{
  constructor(props) {
    super(props);
    this.state = {value: this.props.value};
  }
  handleChange(event) {
		this.setState({value: event.target.value},()=>this.props.callback(this.state.value));
	}
  render(){
    var options =[];
    var n=0;
    for(let item in lexiconRoles) {
      let sele = '';
      if(lexiconRoles[item].en==this.props.defaultValue){sele = 'selected';}
      options.push(<option key={n++} value={lexiconRoles[item].en} selected={sele}>{lexiconRoles[item].ru}</option>);
      }
    return (
      <div className="form_row">
        <label>Должность сотрудника </label>
        <select value={this.state.value} onChange={this.handleChange.bind(this)}>
          {options}
        </select>
      </div>
    );
  }
}



class EmployeeTextInput extends React.Component{
  constructor(props) {
    super(props);
    this.state = {value: this.props.value};
  }
  handleChange(event) {
		this.setState({value: event.target.value},()=>this.props.callback(this.state.value));
	}
  render(){
    let star="";
    let errorMsg="";
    if(this.props.require=="require"){
      star=<span className="req">*</span>
      errorMsg=<span className="errorMsg">Поле обязательно для заполнения</span>
    }
    return (
      <div className="form_row">
          <label>{this.props.label}{star}</label>
          <input value={this.state.value}
                 className={this.props.border}
                 onChange={this.handleChange.bind(this)}/>
          {errorMsg}
      </div>
    );
  }
}


class EmployeeMaskInput extends React.Component{
  constructor(props) {
    super(props);
    this.state = {value: this.props.value};
  }
  handleChange(event) {
		this.setState({value: event.target.value},()=>this.props.callback(this.state.value));
	}
  render(){
    let star="";
    let errorMsg="";
    if(this.props.require=="require"){
      star=<span className="req">*</span>
      errorMsg=<span className="errorMsg">Поле необходимо заполнить полностью</span>
    }
    return (
      <div className="form_row">
          <label>{this.props.label}{star}</label>
          <MaskedInput  value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                        className={this.props.border}
                        mask={this.props.masked}/>
          {errorMsg}
      </div>
    );
  }
}


class EmployeeCheckbox extends React.Component{
  constructor(props) {
    super(props);
    this.state = {value: this.props.value};
  }
  handleChange(event) {
		this.setState({value: event.target.checked},()=>this.props.callback(this.state.value));
	}
  render(){
    return (
      <div className="form_row">
          <label>
            <span>{this.props.label}</span>
            <input type="checkbox"
                   checked={this.state.value}
                   onChange={this.handleChange.bind(this)}/>
          </label>
      </div>
    );
  }
}

export {EmployeeRoleSelect,EmployeeTextInput,EmployeeMaskInput,EmployeeCheckbox};
