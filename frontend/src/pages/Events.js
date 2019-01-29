import React, { Component } from 'react';
import './Events.css';
import Modal from '../components/modal/Modal';
import Backdrop from '../components/backdrop/backdrop';
import AuthContext from '../context/auth-context';

export class EventsPage extends Component {
  state = {
    creating: false
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.titleElement = React.createRef();
    this.priceElement = React.createRef();
    this.dateElement = React.createRef();
    this.descriptionElement = React.createRef();
  }

  createEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const title = this.titleElement.current.value;
    const price = +this.priceElement.current.value;
    const date = this.dateElement.current.value;
    const description = this.descriptionElement.current.value;

    if (
      title.trim().length === 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }

    const event = { title, price, date, description };

    const requestBody = {
      query: `
          mutation {
            createEvent(eventInput: {
              title: "${event.title}",
              description: "${event.description}",
              price: ${event.price},
              date: "${event.date}"
            })
            {
             _id
             title
             price
             date
             description
             creator {
               _id
               email
             }
            }
          }
        `
    };

    const token = this.context.token;
    console.log(token);
    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        /* prettier-ignore */
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        console.log(res);
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Request Failed');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
      })
      .catch(err => {
        console.log(err);
      });
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
            <form>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  ref={this.titleElement}
                />
              </div>
              <div className="form-control">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  ref={this.priceElement}
                />
              </div>
              <div className="form-control">
                <label htmlFor="date">Date</label>
                <input
                  type="datetime-local"
                  name="date"
                  id="date"
                  ref={this.dateElement}
                />
              </div>
              <div className="form-control">
                <label htmlFor="description">description</label>
                <textarea
                  name="description"
                  id="description"
                  rows="4"
                  ref={this.descriptionElement}
                />
              </div>
            </form>
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
