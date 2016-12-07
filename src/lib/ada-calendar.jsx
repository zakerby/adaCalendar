import React, { Component } from 'react';
import * as _ from 'lodash';
import moment from 'moment';

require("../../node_modules/bootstrap/dist/css/bootstrap.min.css")
require("../../node_modules/font-awesome/css/font-awesome.min.css")

import Week from './week';
import EventModal from './event-modal';

import '../index.css';

/* AdaCalendar class: instanciate a specific calendar component with a event-management system
  * props : - events: Array of events

*/

export default class AdaCalendar extends Component {
  constructor(props, context) {
    super(props, context);
    moment.locale('fr');
    // we init the month at the current month and the current day as seleted
    // if the props events is undefined, we declare a new array of event
    this.state = {
      month: moment().startOf("day"),
      selected: moment().startOf("day"),
      showEventModal: false,
      events: this.props.events !== undefined ? this.props.events : [],
    };

    this.previous = this.previous.bind(this);
    this.select = this.select.bind(this);
    this.closeEvent = this.closeEvent.bind(this);
    this.next = this.next.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.eraseEvent = this.eraseEvent.bind(this);
  };

 // disply the previous month
  previous() {
		var month = this.state.month;
		month.add(-1, "M");
		this.setState({ month: month });
	}

  // display the next month
	next() {
		var month = this.state.month;
		month.add(1, "M");
		this.setState({ month: month });
	}

  // method called when a day is selected by the click
  // open the event modal with the current selected day as props
	select(day) {
    // we check if the day already contain an event
    var event = this.state.events.find(function(event){
        return day.date.diff(event.date) === 0;
      });
    this.setState({ selected: event ? event : day, showEventModal: true });
		this.forceUpdate();
	}
  // method which build the array of Week components of the current month
  // called in the render method of ada-calendar
  renderWeeks() {
    var weeks = [],
        done = false,
        date = this.state.month.clone().startOf("month").add("w" -1).day("Sunday"),
        monthIndex = date.month(),
        count = 0;

    while (!done) {
      weeks.push(<Week key={date.toString()} date={date.clone()}
                       month={this.state.month}
                       select={this.select}
                       selected={this.state.selected}
                       events={this.state.events} />);
      date.add(1, "w");
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }
    return weeks;
  }

  renderMonthLabel() {
    return <span>{this.state.month.format("MMMM, YYYY")}</span>;
  }

  // method called when the EventModal is closed by the user
  closeEvent(){
    this.setState({showEventModal: false});
  }

  // method called when the user has clicked on the Save/Modify button
  // which is disabled if the title and the time interval are invalid
  saveEvent(event){
      var resultEvents = this.state.events;
      // actually the calendar manage one event per day
      // so we find if the event saved is'nt at the same day
      // than another event
      for(let w = 0; w < resultEvents.length; w++){
        if(event.date.diff(resultEvents[w].date) === 0){
          // if we find one event matching, we erase it from the events array
          resultEvents.splice(w, 1);
        }
      }
      resultEvents.push(event);
      this.setState({showEventModal: false, events: resultEvents, selected: event});
  }

  // method which erase an event from the events array
  eraseEvent(eventDate){
    let resultEvents = this.state.events;
    for(let w = 0; w < resultEvents.length; w++){
      // if the date corresponds, we erase it
      if(eventDate.diff(resultEvents[w].date) === 0){
        resultEvents.splice(w, 1);
        // closing modal and update events array
        this.setState({events: resultEvents, showEventModal: false});
        break;
      }
    }
  }

  render() {
    return (<div className="calendar">
			<div className="header">
				<i className="btn fa fa-angle-left" onClick={this.previous}></i>
				{this.renderMonthLabel()}
				<i className="btn fa fa-angle-right" onClick={this.next}></i>
			</div>
      <div className="week names">
      			<span className="day">dim.</span>
      			<span className="day">lun.</span>
      			<span className="day">mar.</span>
      			<span className="day">mer.</span>
      			<span className="day">jeu.</span>
      		  <span className="day">ven.</span>
      		  <span className="day">sam.</span>
      </div>
      {this.renderWeeks()}

      { this.state.showEventModal ?
      <EventModal  withShow={this.state.showEventModal}
                   day={this.state.selected}
                   withCloseEvent={this.closeEvent}
                   saveEvent={this.saveEvent}
                   eraseEvent={this.eraseEvent}
                   events={this.state.events}/>
      : '' }
		</div>);
  }
}
