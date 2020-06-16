import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';

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

const Search = ({ searchRockets }) => {
  const classes = useStyles();
  const [text, setText] = useState('');

  const onSubmit = () => {
    searchRockets(text);
    setText('');
  };

  function filterLaunches() {
    document.querySelectorAll('#mission_name').forEach((launch) => {
      const card = launch.textContent;

      if (card.toLocaleLowerCase().indexOf(text.toLocaleLowerCase()) != -1) {
        launch.style.display = 'block';
      } else {
        launch.style.display = 'none';
      }
    });
  }

  const onChange = (e) => {
    setText(e.target.value);
    filterLaunches();
  };

  const keyPressed = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
      filterLaunches();
    }
  };

  return (
    <div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <i className='fas fa-search'></i>
        </div>
        <InputBase
          placeholder='Search…'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          value={text}
          onChange={onChange}
          onKeyPress={keyPressed}
        />
      </div>
    </div>
  );
};

export default Search;
