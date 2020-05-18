import React from 'react';
import {
  Drawer,
  makeStyles,
  CssBaseline,
  Divider,
  Avatar,
  Toolbar,
} from '@material-ui/core';

const drawerWidth = '20%';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: drawerWidth,
    backgroundColor: 'green',
    float: 'left',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: '-1',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    marginTop: theme.spacing(2),
    margin: 'auto',
  },
  Divider: {
    marginTop: theme.spacing(4),
  },
  h3: {
    textAlign: 'center',
  },
}));

const SideNav = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <Avatar
            alt='Remy Sharp'
            src='/images/default_img1.jpg'
            className={classes.large}
          />
          <h3>Remy Sharp</h3>
          <h4>Mechanical Engineer</h4>
          <Divider className={classes.Divider} />
        </div>
      </Drawer>
    </div>
  );
};

export default SideNav;
