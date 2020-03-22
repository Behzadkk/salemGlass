import React, { Component } from "react";
import ContactForm from "../components/ContactForm/ContactForm";
import AuthContext from "../context/authContext";
import AboutSection from "../components/AboutSection/AboutSection";
import Spinner from "../components/Spinner/Spinner";
import { Markup } from "interweave";

class AboutUsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      section: "",
      data: {},
      edit: {}
    };
  }
  static contextType = AuthContext;

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchData();
    this.setState({
      section: this.props.match.params.section
    });
  }
  componentDidUpdate(prevProps, prevState) {
    window.scrollTo(0, 0);
    if (prevProps.match.params.section !== this.props.match.params.section) {
      this.setState({
        section: this.props.match.params.section
      });
    }
  }
  fetchData = () => {
    this.setState({ isLoading: true });
    fetch("/api/about")
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState({
          data: resData.data,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div>
            {this.state.section === "about" && (
              <AboutSection data={this.state.data[0]} />
            )}
            {this.state.section === "whyUs" && (
              <AboutSection data={this.state.data[1]} />
            )}
            {this.state.section === "contactUs" && (
              <div className='' id='contactUs'>
                <AboutSection data={this.state.data[2]}>
                  <div className=''>
                    <p></p>
                    <iframe
                      title='xray location'
                      src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.3369545718497!2d-0.3069603840429662!3d51.488683819892124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760d53a8117bf9%3A0x738c9724168a8a92!2sxray%20glazing%20ltd!5e0!3m2!1sen!2suk!4v1572094486672!5m2!1sen!2suk'
                      width='100%'
                      height='450'
                      frameBorder='0'
                      allowFullScreen=''
                    ></iframe>
                  </div>
                  <div id='contact' className=''>
                    <div className='contact-form'>
                      <div className='mb-5  text-white text-center'>
                        <Markup content={this.state.data[2].formHeading} />
                      </div>
                      <ContactForm adminEmail={this.props.adminEmail} />
                    </div>
                  </div>
                </AboutSection>
              </div>
            )}
            {this.state.section === "quote" && (
              <div>
                <AboutSection data={this.state.data[3]}>
                  <div id='contact' className=''>
                    <div className='contact-form'>
                      <div className=' mb-5 text-white text-center'>
                        <Markup content={this.state.data[3].formHeading} />
                      </div>
                      <ContactForm adminEmail={this.props.adminEmail} />
                    </div>
                  </div>
                </AboutSection>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default AboutUsPage;
