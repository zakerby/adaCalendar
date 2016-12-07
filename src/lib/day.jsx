import React, { Component } from 'react';

/* Day class: instanciate a specific Day component which contains
   a date object and an array of events
*/

export default class Day extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      events: this.props.day.events,
      day: this.props.day
    };
  };

  // method which check if the event parameter has the same date
  // as this current instance of day
  dayHasEvent(event){
     return this.props.day.date === event.day;
  }

  render() {
    // we check if the day already contain an event
    var hasEvent = this.props.events.find(function(event){
        return this.props.day.date.diff(event.date) === 0;
      }.bind(this));

    var dayClass = 'btn day';
    dayClass += (this.state.day.isToday) ? ' today' : '';
    dayClass += (this.state.day.isCurrentMonth) ? '' : ' different-month'
    if(this.props.selected){
      dayClass += (hasEvent) ? ' hasEvent' : ' selected';
    } else {
      dayClass += '';
    }

		return (
              <span key={this.state.day.date.toString()}
                    className={dayClass}
                    onClick={this.props.select.bind(null, this.state.day)}>
                    {this.state.day.number}
              </span>
          );
  }
}
