import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import SideNav from './components/layout/SideNav';
import Rockets from './components/rockets/Rockets';
import Rocket from './components/rockets/Rocket';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    rockets: [],
    rocket: {},
    loading: false,
    launch: {},
  };

  // Get all launches
  async componentDidMount() {
    this.setState({ loading: true });

    const res = await axios.get('https://api.spacexdata.com/v3/launches');

    this.setState({ rockets: res.data, loading: false });
  }

  render() {
    const { rocket, loading, rockets, launch } = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar />
          <SideNav />
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Fragment>
                  <Rockets loading={loading} rockets={rockets} />
                </Fragment>
              )}
            />
            <Route
              exact
              path='/launch/:flight_number'
              render={(props) => (
                <Rocket
                  {...props}
                  launch={launch}
                  rocket={rocket}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
