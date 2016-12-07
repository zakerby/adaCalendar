import React, { Component } from 'react';

import Day from './day';


/* Week class: instanciate a specific Week component
  * props:
    - date: moment object
    - month: string current month
    - events: the array of events define in the AdaCalendar component
*/

export default class Week extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  };

  render() {
    var days = [],
			date = this.props.date,
			month = this.props.month;
    
		for (var i = 0; i < 7; i++) {
			var day = {
				name: date.format("dd").substring(0, 1),
				number: date.date(),
				isCurrentMonth: date.month() === month.month(),
				isToday: date.isSame(new Date(), "day"),
				date: date,
        events: [],
        fromHour: date,
        toHour: date
			};

      days.push(<Day
                  day={day}
                  key={day.date.toString()}
                  selected={this.props.selected}
                  events={this.props.events}
                  select={this.props.select}
                />);

			date = date.clone();
			date.add(1, "d");
		}

		return (<div className="week" key={days[0].toString()}>
			       {days}
		        </div>);
  }
}
