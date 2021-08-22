import React from 'react';
import {Link}  from 'react-router-dom';
import {techPages} from '../config/appconfig';


class DeleteResult extends React.Component{
    render(){
      return  <TechPage title={techPages.deletePage.title}
                        content={techPages.deletePage.content}/>;
    }
}
class AddResult extends React.Component{
    render(){
      return  <TechPage title={techPages.addPage.title}
                        content={techPages.addPage.content}/>;
    }
}
class EditResult extends React.Component{
    render(){
        return  <TechPage title={techPages.editPage.title}
                          content={techPages.editPage.content}/>;
    }
}

class NotFound extends React.Component{
    render(){
        return  <TechPage title={techPages.notFoundPage.title}
                          content={techPages.notFoundPage.content}/>;
    }
}




class TechPage extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
      return  (
        <div>
            <h3>{this.props.title}</h3>
            <p className="descr">
                {this.props.content}
            </p>
            <div className="mainMenu">
                          <Link to="/">К списку сотрудников</Link>
            </div>
        </div>);
  }
}




export { DeleteResult,AddResult,EditResult,NotFound }
