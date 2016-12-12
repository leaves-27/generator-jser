import React from 'react';

export default React.createClass({
  render: function() {
    return <div className="winner">
      获胜者是 <span>{this.props.winner()}</span>!
    </div>;
  }
});