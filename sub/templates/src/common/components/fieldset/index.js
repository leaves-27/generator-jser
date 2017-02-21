import React,{ Component} from 'react';
import { Link } from 'react-router';
import { isEmptyObject } from '../../utils';

export default class Fieldset extends Component{
  constructor(props){
    super(props);
  }

  render(){
    var _self = this;
    let { navigator,route } = this.props;

    if (!(navigator && !isEmptyObject(navigator))){
      return (<div></div>)
    }

    const list = navigator.map(function(item){
      const path = route.path == ("/"+item.id);
      const rootPath =  (route.path == undefined) && item.id == "contact";

      return (
        <li key={item.name}>
          <Link to={item.id} className={  (path || rootPath) ? "selected" : '' }>{item.name}</Link>
        </li>
      );
    });

    return (
      <div className="sideBox J_sideBox">
        <ul className="nav">
          <li className="title">关于我们</li>
          {list}
        </ul>
      </div>
    )
  }
}
