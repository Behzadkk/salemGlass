import React, { Component } from "react";
import "./ContactUs.css";
import Spinner from "../Spinner/Spinner";
export default class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminEmail: props.adminEmail,
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
      sendingEmail: false,
      isSent: ""
    };
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  submit = async event => {
    event.preventDefault();
    this.setState({ sendingEmail: true });
    const requestBody = this.state;
    await fetch("/contactUs", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        this.setState({
          sendingEmail: false,
          isSent: "sent",
          name: "",
          email: "",
          company: "",
          phone: "",
          message: ""
        });
      })
      .catch(err => {
        this.setState({ sendingEmail: false, isSent: "error" });
        console.log(err);
      });
  };

  render() {
    return (
      <div className='md-8 d-flex justify-content-between container'>
        <form id='contactForm' name='contactForm'>
          <div>
            <label htmlFor='contactName'>
              Name <span className='required'>*</span>
            </label>
            <input
              type='text'
              size={100}
              id='contactName'
              name='name'
              onChange={this.onChange}
              value={this.state.name}
            />
          </div>
          <div>
            <label htmlFor='contactEmail'>
              Email <span className='required'>*</span>
            </label>
            <input
              type='text'
              size={100}
              id='contactEmail'
              name='email'
              onChange={this.onChange}
              value={this.state.email}
            />
          </div>
          <div>
            <label htmlFor='contactCompany'>Company</label>
            <input
              type='text'
              size={100}
              id='contactCompany'
              name='company'
              onChange={this.onChange}
              value={this.state.company}
            />
          </div>
          <div>
            <label htmlFor='contactphone'>Phone</label>
            <input
              type='text'
              size={100}
              id='contactphone'
              name='phone'
              onChange={this.onChange}
              value={this.state.phone}
            />
          </div>
          <div>
            <label htmlFor='contactMessage'>
              Messages <span className='required'>*</span>
            </label>
            <textarea
              cols={50}
              rows={10}
              id='contactMessage'
              name='message'
              onChange={this.onChange}
              value={this.state.message}
            />
          </div>
          <div>
            <button className='submit p-3' onClick={e => this.submit(e)}>
              Submit
            </button>
            {this.state.sendingEmail && <Spinner />}
            {this.state.isSent === "sent" && (
              <div className='text-white mt-4'>
                <i className='fa fa-check mx-2' />
                Your message was sent, thank you!
                <br />
              </div>
            )}
            {this.state.isSent === "error" && (
              <div className='text-white mt-4'>Error boy, Please try again</div>
            )}
          </div>
        </form>
      </div>
    );
  }
}
