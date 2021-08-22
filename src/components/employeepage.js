import React from 'react';
import ReactDOM from 'react-dom';
import {Link,Redirect}  from 'react-router-dom';


import store from '../store/store';
import {addEmployee,deleteEmployee,editEmployee} from '../store/actions';
import {EmployeeRoleSelect,EmployeeTextInput,EmployeeMaskInput,EmployeeCheckbox} from './employeefields'
import {EmplMenu} from './nav';
import {techPages} from '../config/appconfig';

class NewEmployee extends React.Component{
  render(){
    let id0 = 0;
    let arch = false;
      return <div>
                  <EmplMenu/>
                  <h2>Добавление нового сотрудника</h2>
                  <EmployeeForm store={store}
                                id={id0}
                                name=""
                                role="driver"
                                phone=""
                                birthday=""
                                isArchive={arch}/>
             </div>;
    }
}

class EditEmployee extends React.Component{
  constructor(props) {
      super(props);
      if (this.props.location.employeeId){
        this.state=store.getState().staff.find(item => item.id == this.props.location.employeeId);
      }
  }
  render(){
      var title="";
      if (this.props.location.employeeId){
      return  <div>
                <EmplMenu/>
                <h2>Редактирование данных сотрудника</h2>
                <EmployeeForm store={store}
                              id={this.state.id}
                              name={this.state.name}
                              role={this.state.role}
                              phone={this.state.phone}
                              birthday={this.state.birthday}
                              isArchive={this.state.isArchive}/>
              </div>;
      }
      else{return <Redirect to="/" />;}
  }
}



class EmployeeForm  extends React.Component{
  constructor(props) {
     super(props);
     this.state = {
                   id: this.props.id,
                   name: this.props.name,
                   role: this.props.role,
                   phone: this.props.phone,
                   birthday: this.props.birthday,
                   isArchive: this.props.isArchive,
                   nameFieldClass: "",
                   birthdayFieldClass: "",
                   phoneFieldClass: "",
                   delBufer: "",
                   saveBufer: ""
     };

     this.deleteEmployee = this.deleteEmployee.bind(this);
     this.saveEmployee = this.saveEmployee.bind(this);

     this.render = this.render.bind(this);

     this.setName = this.setName.bind(this);
     this.setPhone = this.setPhone.bind(this);
     this.setBirthday = this.setBirthday.bind(this);
     this.setArchive = this.setArchive.bind(this);
     this.setRole = this.setRole.bind(this);

     this.deleteBuferOff = this.deleteBuferOff.bind(this);
     this.deleteBuferOn = this.deleteBuferOn.bind(this);
     this.saveBuferOff = this.saveBuferOff.bind(this);
     this.saveBuferOn = this.saveBuferOn.bind(this);
   }

  setName(val)    {this.setState({name: val});}
  setPhone(val)   {this.setState({phone: val});}
  setBirthday(val){this.setState({birthday: val});}
  setArchive(val) {this.setState({isArchive: val});}
  setRole(val)    {this.setState({role: val});}

  deleteBuferOff(){this.setState({delBufer:  ""},()=>this.render());}
  deleteBuferOn() {this.setState({delBufer:  "modalShow"},()=>this.render());}
  saveBuferOff()  {this.setState({saveBufer: ""},()=>this.render());}
  saveBuferOn()
  {
    //регулярные выражения для проверки на ошибки полей с маской
    var regexpPhone=/\+\d\s\(\d{3}\)\s\d{3}-\d{4}/;
    var regexpBirthday=/\d\d\.\d\d\.\d\d/;

    if ((this.state.name)&&(regexpPhone.test(this.state.phone))&&(regexpBirthday.test(this.state.birthday)))
    {
      this.setState({
                      saveBufer: "modalShow",
                      birthdayFieldClass: "",
                      nameFieldClass: "",
                      phoneFieldClass: ""
                    },()=>this.render());
    }
    else
    {
      if(!regexpBirthday.test(this.state.birthday)){
        this.setState({birthdayFieldClass: "error"},()=>this.render());
      }
      else{
        this.setState({birthdayFieldClass: ""},()=>this.render());
      }
      if(!this.state.name){
        this.setState({nameFieldClass: "error"},()=>this.render());
      }
      else{
        this.setState({nameFieldClass: ""},()=>this.render());
      }
      if(!regexpPhone.test(this.state.phone)){
        this.setState({phoneFieldClass: "error"},()=>this.render());
      }
      else{
        this.setState({phoneFieldClass: ""},()=>this.render());
      }
    }



  }


  deleteEmployee()
  {
      store.dispatch(deleteEmployee(this.props.id))
      this.setState({deleted: true},()=>this.render());
  }

  saveEmployee()
  {
      if(!this.props.id){//Создание нового сотрудника - признак НЕТ id в props
        let maxId = 0;
        this.props.store.getState().staff.forEach((item, i) => {
          if(maxId<item.id){maxId=item.id;}
        });
        maxId++;//чтобы присвоить уникальный id ищем максимальный++
        let employee={
          "id": maxId++,
          "name": this.state.name,
          "isArchive": this.state.isArchive,
          "role": this.state.role,
          "phone": this.state.phone,
          "birthday": this.state.birthday
        };
        store.dispatch(addEmployee(employee));
        this.setState({added: true},()=>this.render());
        for (let key in employee) {
          console.log(key+" "+employee[key]);
        }
      }
      else {//Редактируем сотрудника - признак id в props есть
        let employee={
          "id": this.state.id,
          "name": this.state.name,
          "isArchive": this.state.isArchive,
          "role": this.state.role,
          "phone": this.state.phone,
          "birthday": this.state.birthday
        };
        store.dispatch(editEmployee(employee,this.state.id));
        this.setState({edited: true},()=>this.render());
      }
  }
  render(){
      if      (this.state.deleted) {return (<Redirect to="/delete" push />);}
      else if (this.state.added)   {return (<Redirect to="/add" push />);}
      else if (this.state.edited)  {return (<Redirect to="/edit" push />);}

      let saveButton=<button onClick={this.saveBuferOn}>Сохранить</button>
      let deleteButton=[];
      if(this.props.id){
        deleteButton=<button onClick={this.deleteBuferOn}>Удалить</button>
      }

      return <div className="employeeForm">

                <EmployeeTextInput  label="Имя и фамилия сотрудника"
                                    value={this.props.name}
                                    callback={this.setName}
                                    border={this.state.nameFieldClass}
                                    require="require"
                />
                <EmployeeRoleSelect value={this.props.role}
                                    callback={this.setRole}
                />
                <EmployeeMaskInput  label="Телефон сотрудника"
                                    value={this.props.phone}
                                    callback={this.setPhone}
                                    masked="+1 (111) 111-1111"
                                    border={this.state.phoneFieldClass}
                                    require="require"
                />
                <EmployeeMaskInput  label="Дата рождения сотрудника"
                                    value={this.props.birthday}
                                    callback={this.setBirthday}
                                    masked="11.11.11"
                                    border={this.state.birthdayFieldClass}
                                    require="require"
                />
                <EmployeeCheckbox  label="B архиве"
                                   value={this.props.isArchive}
                                   callback={this.setArchive}
                />
                <p className="tag"><span className="req">*</span> Поля обязательные для заполнения</p>
                <div className="form_row button_group">
                  {saveButton}
                  {deleteButton}
                </div>
                <EmployeeDeleteBufer next={this.deleteEmployee} back={this.deleteBuferOff} show={this.state.delBufer}/>
                <EmployeeSaveBufer   next={this.saveEmployee} back={this.saveBuferOff} show={this.state.saveBufer}/>
             </div>;
  }
}


class EmployeeDeleteBufer extends React.Component{
  render(){
    let mainClassName="modalBg "+this.props.show;
    return (
    <div className={mainClassName}>
      <div className="modal">
                <h2>{techPages.deleteBufer.title}</h2>
                <p className="descr">
                  {techPages.deleteBufer.content}
                </p>
                <div className="mainMenu">
                          <button onClick={this.props.back}>Назад</button>
                          <button onClick={this.props.next}>Продолжить</button>

                </div>
      </div>
    </div>);
  }
}

class EmployeeSaveBufer extends React.Component{
  render(){
    let mainClassName="modalBg "+this.props.show;
    return (
    <div className={mainClassName}>
      <div className="modal">
                <h2>{techPages.saveBufer.title}</h2>
                <p className="descr">{techPages.saveBufer.content}</p>
                <div className="mainMenu">

                          <button onClick={this.props.back}>Назад</button>
                          <button onClick={this.props.next}>Продолжить</button>
                </div>
      </div>
    </div>);
  }
}

export {NewEmployee,EditEmployee};
