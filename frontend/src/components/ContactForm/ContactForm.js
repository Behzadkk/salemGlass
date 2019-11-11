import React, { Component } from "react";
import "./ContactUs.css";

export default class ContactForm extends Component {
  render() {
    return (
      <div className="md-8 d-flex justify-content-between container">
        <form
          method="post"
          action={"https://formsubmit.co/" + this.props.adminEmail}
          id="contactForm"
          name="contactForm"
        >
          <fieldset>
            <div>
              <label htmlFor="contactName">
                Name <span className="required">*</span>
              </label>
              <input type="text" size={100} id="contactName" name="Name" />
            </div>
            <div>
              <label htmlFor="contactEmail">
                Email <span className="required">*</span>
              </label>
              <input type="text" size={100} id="contactEmail" name="Email" />
            </div>
            <div>
              <label htmlFor="contactCompany">Company</label>
              <input
                type="text"
                size={100}
                id="contactCompany"
                name="company"
              />
            </div>
            <div>
              <label htmlFor="contactphone">Phone</label>
              <input type="text" size={100} id="contactphone" name="phone" />
            </div>
            <div>
              <label htmlFor="contactMessage">
                Messages <span className="required">*</span>
              </label>
              <textarea
                cols={50}
                rows={10}
                id="contactMessage"
                name="Message"
              />
            </div>
            <div>
              <button className="submit p-3">Submit</button>
              <span id="image-loader">
                <img alt="loader" src="images/loader.gif" />
              </span>
            </div>
          </fieldset>
        </form>
        <div id="message-warning"> Error boy</div>
        <div id="message-success">
          <i className="fa fa-check" />
          Your message was sent, thank you!
          <br />
        </div>
      </div>
    );
  }
}
