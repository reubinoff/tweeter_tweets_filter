import React, { Component } from 'react';


import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Layout from './Navigation/Layout'
import Public from './Components/public.jsx'
import Private from './Components/private.jsx'
import Home from './Components/home.jsx'


class Main extends Component {
  render() {
    return (
      <Router>

        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/public" component={Public} />
          <Route path="/private" component={Private} />
        </Layout>
      </Router>

    )
  }
}

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <NavBar/>
//           <img src={logo} alt="logo" />
//           <h2>Backend Project</h2>
//         </div>
//                                 <Layout>
//                                 <Route exact path="/" component={Greeting}/>

//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

export default Main;
