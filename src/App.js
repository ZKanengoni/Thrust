import React, { Component } from 'react';
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

    console.log(this.state.rockets);
  }

  render() {
    return (
      <div className='App'>
        <Navbar />
        <SideNav />
        <Rockets loading={this.state.loading} rockets={this.state.rockets} />
      </div>
    );
  }
}

export default App;
