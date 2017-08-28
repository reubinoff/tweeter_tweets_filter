import React, { Component } from 'react';

import './NavBar.css'



class LoginsContainer extends Component {
    render() {
        return (
            <div className="navbar-nav navbar-right" >
             
                <p className="navbar-text navbar-right" style={{color: "white" }}> or</p>


                <form className="navbar-form navbar-right ">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username"></input>
                        <input type="text" className="form-control" placeholder="Password"></input>
                    </div>
                    <button type="submit" className="btn btn-default">
                        Login </button>
                </form>
                <ul className="btn-toolbar navbar-right">

                    <button className="btn btn-default navbar-btn">
                    <i className="glyphicon glyphicon-user"></i>Signup</button>
                    <button className="btn btn-default navbar-btn btn-google">
                    <i className="fa fa-google-plus fa-1x" ></i> </button>
                </ul>
            </div>
        );
    }
}

export default LoginsContainer;
