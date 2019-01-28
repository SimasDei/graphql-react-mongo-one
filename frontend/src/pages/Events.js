import React, { Component } from 'react';
import './Events.css';
import Modal from '../components/modal/Modal';
import Backdrop from '../components/backdrop/backdrop';

export class EventsPage extends Component {
  state = {
    creating: false
  };

  createEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Ahoy Sailor o/"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <p>Modal Content Goes Here</p>
          </Modal>
        )}

        <div className="events-control">
          <p>Share and Create an Upcoming Event</p>
          <button className="btn" onClick={this.createEventHandler}>
            Create Event
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default EventsPage;
