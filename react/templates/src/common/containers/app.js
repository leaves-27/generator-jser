import React,{ Component,PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionType from '../actions/index';

class App extends Component{
  render(){
    const { navigator,actions } = this.props;
    return (
      <div className="container">
        {this.props.children}
      </div>
    )
  }
};


export default App;
