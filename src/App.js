import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import SideNav from './components/layout/SideNav';
import Rockets from './components/rockets/Rockets';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    rockets: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const res = await axios.get('https://api.spacexdata.com/v3/launches');

    this.setState({ rockets: res.data, loading: false });

    // console.log(this.state.rockets);
  }

  render() {
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
                  <Rockets
                    loading={this.state.loading}
                    rockets={this.state.rockets}
                  />
                </Fragment>
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
