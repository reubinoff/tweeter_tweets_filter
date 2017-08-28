import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { Link } from 'react-router-dom';

import LoginsContainer from './LoginsContainer'
import './NavBar.css'
class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  static get contextTypes() {
    return {
      router: PropTypes.object.isRequired,
    };
  }


  render() {


    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
          <ul className="nav navbar-nav">     
            <li><Link to="/" className="fa fa-home"></Link></li>
            
            <li><Link to="/public">Public</Link></li>
            <li><Link to="/private">Private</Link></li>
       
            </ul>
          </div>

          <LoginsContainer />

        </div>
      </nav>
    );
  }
}


export default NavigationBar;
