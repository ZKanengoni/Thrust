import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Avatar, withStyles } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';

const styles = {
  nav: {
    marginBottom: '4rem',
  },
  tool: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
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
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <i class='fas fa-search'></i>
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
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
