import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AdaCalendar from './lib/ada-calendar';

 class App extends Component {
  render() {
    return (<AdaCalendar events={[]}/>);
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
