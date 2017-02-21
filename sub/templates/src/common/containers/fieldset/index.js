import React,{ Component,PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionType from '../../actions/index';

import Menu from '../../components/menu/index';

class Fieldset extends Component{
  render(){
    const { navigator,actions,route } = this.props;
    return (
      <form className="form-horizontal">
        <legend>
          生成fieldset
          <button>添加</button>
        </legend>
        <div className="control-group">
          <label className="control-label">字段名</label>
          <div className="controls">
            <input type="text" placeholder="输入你想输入的字段值" />
          </div>
        </div>
      </form>
    )
  }
};

Contact.propTypes = {
  navigator: PropTypes.array.isRequired,
  currentNav: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state,ownProps) => { //将store中特定的值绑定到子组件上
  return {
    navigator:state.navigator,
    currentNav: state.currentNav,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators({
      get_navigator:actionType.get_navigator
    },dispatch)
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Contact);
