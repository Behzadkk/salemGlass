import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import "./MainNav.css";
import DropDown from "./DropDown/DropDown";

class MainNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooflights: null,
      windows: null,
      doors: null,
      otherProducts: null,
      isLoading: true
    };
  }

  componentDidMount() {
    this.setState(() => {
      const rooflights = this.props.products.filter(
        p => p.category === "rooflights"
      );
      const windows = this.props.products.filter(p => p.category === "windows");
      const doors = this.props.products.filter(p => p.category === "doors");
      const otherProducts = this.props.products.filter(
        p => p.category === "other"
      );
      return { rooflights, windows, doors, otherProducts, isLoading: false };
    });
  }
  offcanvassHandler = () => {
    document.getElementById("navbarsExampleDefault").classList.toggle("open");
  };

  render() {
    return (
      <AuthContext.Consumer>
        {context => {
          return (
            <nav
              className='navbar navbar-expand-lg bg-black fixed-top'
              id='navbar'
            >
              <div className='container'>
                <Link className='navbar-brand' to='/'>
                  <img
                    src='/xray-logo.jpg'
                    alt='xray-glazing'
                    className='brand'
                    id='logo'
                  />
                </Link>

                <button
                  id='offcanvas'
                  className='navbar-toggler navbar-dark'
                  type='button'
                  data-toggle='offcanvas'
                  onClick={this.offcanvassHandler}
                >
                  <span className='navbar-toggler-icon'></span>
                </button>

                <div
                  className='navbar-collapse offcanvas-collapse'
                  id='navbarsExampleDefault'
                >
                  {!this.state.isLoading && (
                    <ul className='navbar-nav mr-auto container'>
                      <DropDown
                        products={this.state.rooflights}
                        name='Rooflights'
                        clickHandler={this.offcanvassHandler}
                      />
                      <DropDown
                        products={this.state.windows}
                        name='Windows'
                        clickHandler={this.offcanvassHandler}
                      />
                      <DropDown
                        products={this.state.doors}
                        name='Doors'
                        clickHandler={this.offcanvassHandler}
                      />
                      <DropDown
                        products={this.state.otherProducts}
                        name='Other Products'
                        clickHandler={this.offcanvassHandler}
                        link='other'
                      />
                      <li className='nav-item' onClick={this.offcanvassHandler}>
                        <Link className='nav-link' to='/gallery'>
                          Gallery
                        </Link>
                      </li>
                      <li className='nav-item' onClick={this.offcanvassHandler}>
                        <Link className='nav-link' to='/projects'>
                          Projects
                        </Link>
                      </li>
                      <li className='nav-item' onClick={this.offcanvassHandler}>
                        <Link className='nav-link' to='/drawings'>
                          Drawings
                        </Link>
                      </li>
                      <li
                        className='nav-item dropdown'
                        onClick={this.offcanvassHandler}
                      >
                        <Link
                          className='nav-link dropdown-toggle'
                          id='dropdown01'
                          to='/about/about'
                        >
                          About Us
                        </Link>
                        <div className='dropdown-menu dropdown-content m-0 p-0'>
                          <Link className='dropdown-item' to='/about/whyUs'>
                            Why Us
                          </Link>
                          <Link className='dropdown-item' to='/about/contactUs'>
                            Contact Us
                          </Link>
                          <Link className='dropdown-item' to='/about/quote'>
                            Request A Free Quote
                          </Link>
                        </div>
                      </li>
                      {context.token && (
                        <React.Fragment>
                          <li
                            className='nav-item border'
                            onClick={this.offcanvassHandler}
                          >
                            <Link className='nav-link' to='/admin'>
                              ADMIN PAGE
                            </Link>
                          </li>
                          <li className='nav-item'>
                            <Link
                              className='nav-link'
                              onClick={context.logout}
                              to='/'
                            >
                              LogOut
                            </Link>
                          </li>
                        </React.Fragment>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </nav>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default MainNavigation;
