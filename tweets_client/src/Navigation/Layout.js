import React from 'react';
import NavigationBar from './NavBar.jsx';
import logo from './tweets_client.png';
import './App.css';
class Layout extends React.Component {

    render() {
        return (
            
                <div className="App">
                    <div className="App-header">
                        <NavigationBar />
                        <img src={logo} alt="logo" />
                        <h2>Backend Project</h2>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            {this.props.children}
                        </div>
                    </div>

                </div>
        );
    }
}

export default Layout;
