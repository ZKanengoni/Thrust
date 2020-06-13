import React, { useState } from 'react';
import {
  Drawer,
  makeStyles,
  CssBaseline,
  Divider,
  Avatar,
  Toolbar,
  Button,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Switch from '@material-ui/core/Switch';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

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
  nested: {
    paddingLeft: theme.spacing(4),
  },
  btn: {
    margin: 'auto',
  },
}));

const SideNav = (props) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const [checked, setChecked] = React.useState(['']);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

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
          <List>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <i
                  className='fas fa-filter fa-lg'
                  style={{ color: '#FF8E53' }}
                ></i>
              </ListItemIcon>
              <ListItemText primary='Filter' />
              {open ? (
                <i
                  className='fas fa-sort-up fa-lg'
                  style={{ color: '#FF8E53' }}
                ></i>
              ) : (
                <i
                  className='fas fa-sort-down fa-lg'
                  style={{ color: '#FF8E53' }}
                ></i>
              )}
            </ListItem>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <i className='fas fa-sort-amount-up fa-lg'></i>
                  </ListItemIcon>
                  <ListItemText primary='Ascending' />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <i className='fas fa-sort-amount-down fa-lg'></i>
                  </ListItemIcon>
                  <ListItemText primary='Descending' />
                </ListItem>
              </List>
            </Collapse>
            <ListItem>
              <ListItemIcon>
                <i
                  className='fas fa-check-circle fa-lg'
                  style={{ color: '#FF8E53' }}
                ></i>
              </ListItemIcon>
              <ListItemText
                id='switch-list-label'
                primary='Successful launches'
              />
              <ListItemSecondaryAction>
                <Switch
                  edge='end'
                  onChange={handleToggle('Successful launches')}
                  checked={checked.indexOf('Successful launches') !== -1}
                  inputProps={{ 'aria-labelledby': 'switch-list-label' }}
                  color='primary'
                  style={{
                    color: '#FF8E53',
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <Button
                disabled={true}
                className={classes.btn}
                // style={{ color: '#FF8E53 ' }}
              >
                Compare
              </Button>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default SideNav;
