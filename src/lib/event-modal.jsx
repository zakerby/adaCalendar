import React, { Component } from 'react';
import { Button, Modal, FormGroup, FormControl, ControlLabel, ButtonToolbar } from 'react-bootstrap';

import TimePicker from 'rc-time-picker';

import 'rc-time-picker/assets/index.css';

/* Event Modal class: instanciate a modal of creation or modification of a event
  * State attributes :
    - description: string, the description of the event
    - fromHour: A moment time
    - toHour: A moment time
    - title : string, the title of the event
    - isModifying: boolean: indicate if the current event is already save in the calendar


  * Props attributes:
    - day: an object which contains :
        - description: string
        - fromHour: moment
        - toHour: moment
        - title : string
*/


export default class EventModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      description: this.props.day.description,
      fromHour: this.props.day.fromHour.hour() < 9 ? this.props.day.fromHour.clone().add(9 - this.props.day.fromHour.hour(), 'hour') : this.props.day.fromHour,
      toHour: this.props.day.toHour.hour() === 0 ? this.props.day.toHour.clone().add(22 - this.props.day.toHour.hour(), 'hour') : this.props.day.toHour,
      date: this.props.day.date,
      title: this.props.day.title,
      isModifying: this.props.day.title !== undefined && this.props.day.fromHour !== undefined && this.props.day.toHour !== undefined,
    };

    this.descriptionChange = this.descriptionChange.bind(this);
    this.onFromHourChange = this.onFromHourChange.bind(this);
    this.onToHourChange = this.onToHourChange.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.eraseEvent = this.eraseEvent.bind(this);
    this.showExactMinute = this.showExactMinute.bind(this);
  };

  descriptionChange(event){
    let newVal = (event.target.value.length > 0) ? event.target.value : undefined;
    this.setState({ description: newVal});
  }

  titleChange(event){
    let newVal = (event.target.value.length > 0) ? event.target.value : undefined;
    this.setState({ title: newVal});
  }

  onFromHourChange(value){
    this.setState({ fromHour: value});
  }

  onToHourChange(value){
    this.setState({ toHour: value});
  }

  saveEvent(){
    let savedItem = {
      date: this.state.date,
      description: this.state.description,
      fromHour: this.state.fromHour,
      toHour: this.state.toHour,
      title: this.state.title
    }
    this.props.saveEvent(savedItem);
  }

  eraseEvent(){
    this.props.eraseEvent(this.state.date);
  }

  showExactMinute(){
     let res = [];
     for(let u = 0; u < 60;  u++){
       if(u % 5 !== 0){
         res.push(u);
       }
     }
     return res;
   }

  render() {
    var valid = (this.state.title !== undefined)
                && this.state.fromHour.diff(this.state.toHour) < 0;

    return (
        <Modal show={this.props.withShow}>
        <Modal.Header>
          <Modal.Title>{this.state.isModifying ? 'Modification de l\'évènement' : 'Nouvel évènement'}</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="titleInput">
                <ControlLabel>Titre</ControlLabel>
                <FormControl componentClass="input" placeholder="Entrez le titre de l'évenement" value={this.state.title} onChange={this.titleChange} />
              </FormGroup>

              <FormGroup controlId="dateLabel">
                <ControlLabel>Date &nbsp; {this.props.day.date.format('DD/MM/YYYY')}</ControlLabel>
              </FormGroup>

              <FormGroup controlId="fromHourSelect">
                <ControlLabel>Heure de début &nbsp;</ControlLabel>
                <TimePicker
                  style={{ width: 50 }}
                  showSecond={false}
                  value={this.state.fromHour}
                  onChange={this.onFromHourChange}
                  disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 22]}
                  disabledMinutes={this.showExactMinute}
                  hideDisabledOptions
                />
              </FormGroup>

              <FormGroup controlId="toHourSelect">
                <ControlLabel>Heure de fin &nbsp;</ControlLabel>
                <TimePicker
                  style={{ width: 50 }}
                  showSecond={false}
                  value={this.state.toHour}
                  onChange={this.onToHourChange}
                  disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 8]}
                  disabledMinutes={this.showExactMinute}
                  hideDisabledOptions
                />
              </FormGroup>

              <FormGroup controlId="descriptionTextArea">
                <ControlLabel>Description</ControlLabel>
                <FormControl componentClass="textarea" placeholder="Entrez la description de l'évenement" value={this.state.description} onChange={this.descriptionChange} />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button onClick={this.saveEvent} bsStyle='primary' disabled={!valid}>{this.state.isModifying ? 'Modifier' :'Ajouter' }</Button>
              {this.state.isModifying ?
                <Button onClick={this.eraseEvent} bsStyle='warning'>Effacer</Button>
                :
                ''
              }
              <Button onClick={this.props.withCloseEvent} bsStyle='danger'>Annuler</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
    );
  }
}
