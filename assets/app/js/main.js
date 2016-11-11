const React = require('react');
const ReactDOM = require('react-dom');
const $ = global.jQuery = require('jquery');
const _ = require('lodash');

const Counter = React.createClass({
  getInitialState() {
    return {
      count: 0
    };
  },

  onClick () {
    this.setState({ count: this.state.count + 1 });
  },

  render () {
    return (
      <div>
        <div>count:{this.state.count}</div>
        <button onClick={this.onClick}>Click it!</button>
      </div>
    );
  },
});

ReactDOM.render(<Counter />, document.getElementById('app'));




