import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Avatar, withStyles } from '@material-ui/core';
import axios from 'axios';
import Search from '../rockets/Search';

const styles = {
  nav: {
    marginBottom: '4rem',
  },
  tool: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

// Search SpaceX launches
const searchRockets = async (text) => {
  const res = await axios.get(
    `https://api.spacexdata.com/v3/launches?mission_name=${text}`
  );

  console.log(res.data);
  //setState({ rockets: res.data, loading: false });
};

const Navbar = (props) => {
  const nav = props.classes.nav;
  const tool = props.classes.tool;
  const { icon } = props;

  return (
    <div className={nav}>
      <AppBar position='fixed'>
        <Toolbar className={tool}>
          <a href='#' style={{ color: '#fff' }}>
            <i className={icon}></i>
          </a>
          <Search searchRockets={searchRockets} />
          <Avatar alt='Remy Sharp' src='/images/default_img1.jpg' />
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.defaultProps = {
  icon: 'fas fa-rocket fa-2x',
};

Navbar.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default withStyles(styles)(Navbar);
