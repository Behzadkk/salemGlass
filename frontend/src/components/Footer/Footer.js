import React, { Component } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "./Footer.css";
import FooterMenu from "./FooterMenu/FooterMenu";
import ContactInfo from "../ContactInfo/ContactInfo";
import EditFooter from "../EditFooter/EditFooter";
import AuthContext from "../../context/authContext";

class Footer extends Component {
  state = {
    isLoading: true,
    data: null
  };
  static contextType = AuthContext;
  componentDidMount() {
    this.fetchDetails();
  }
  fetchDetails = () => {
    this.setState({ isLoading: true });
    fetch("/api/footer")
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        this.setState({ data: resData.footer, isLoading: false });
        this.props.adminEmail(resData.footer[3].text4);
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };
  editingPage = () => {
    this.setState(prevState => {
      return { isEditing: !prevState.isEditing };
    });
  };

  render() {
    return (
      <div>
        {!this.state.isLoading && (
          <MDBFooter className='font-small pt-4 mt-4'>
            <MDBContainer fluid className='container text-center text-md-left'>
              <MDBRow>
                <FooterMenu data={this.state.data[0]} />
                <FooterMenu data={this.state.data[1]} />
                <FooterMenu data={this.state.data[2]} />
                <MDBCol md='3' sm='6' className='text-left'>
                  <ContactInfo data={this.state.data[3]} />
                </MDBCol>
              </MDBRow>

              <hr className='border-secondary' />
            </MDBContainer>
            <div className='footer-copyright text-center py-3'>
              <MDBContainer fluid>
                &copy; {new Date().getFullYear()} Copyright:{" "}
                <a href='/'>{this.state.data[4].groupName}</a>
              </MDBContainer>
              <div className='container d-lg-flex justify-content-end'>
                <nav className='navbar navbar-light col-lg-3'>
                  <ul className='navbar-nav margin-0-auto flex-row '>
                    <li className='nav-item mx-3'>
                      <a className='nav-link' href={this.state.data[4].link1}>
                        <img
                          src='/images/youtube.png'
                          alt='social media'
                          className='social-icon'
                        />
                      </a>
                    </li>
                    <li className='nav-item mx-3'>
                      <a className='nav-link' href={this.state.data[4].link2}>
                        <img
                          src='/images/insta.png'
                          alt='social media'
                          className='social-icon'
                        />
                      </a>
                    </li>
                    <li className='nav-item mx-3'>
                      <a className='nav-link' href={this.state.data[4].link3}>
                        <img
                          src='/images/google.png'
                          alt='social media'
                          className='social-icon'
                        />
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            {this.context.token && (
              <div className='container'>
                <button
                  className='btn btn-sm btn-warning'
                  onClick={this.editingPage}
                >
                  Edit footer
                </button>
              </div>
            )}
            {this.state.isEditing && (
              <div>
                <EditFooter data={this.state.data[0]} />
                <EditFooter data={this.state.data[1]} />
                <EditFooter data={this.state.data[2]} />
                <EditFooter data={this.state.data[3]} />
                <EditFooter data={this.state.data[4]} />
              </div>
            )}
          </MDBFooter>
        )}
      </div>
    );
  }
}

export default Footer;
