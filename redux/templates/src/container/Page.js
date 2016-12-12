import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Winner from '../components/Winner';
import * as actionCreators from '../action/action_creators';

export const PageComponent = React.createClass({
  mixins:[PureRenderMixin],
  render: function(){
    return <Vote {...this.props} />;
  }
});

function mapStateToProps(state) {
  return {
    winner: state.get('winner')
  };
}

export const Page = connect(mapStateToProps,actionCreators)(PageComponent);