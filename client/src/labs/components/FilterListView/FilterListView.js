import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import SearchBar from "./SearchBar";
import Popover from "./Popover";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

// const parseISO = s => {
//   s = s.split(/\D/);
//   return new Date(Date.UTC(s[0], --s[1], s[2], s[3], s[4], s[5], s[6]));
// };

const toFilterArr = (sourceArr, element) => {
  let filteredArr = sourceArr.filter(item => {
    return item.name.toLowerCase().indexOf(element.toLowerCase()) !== -1;
  });
  return (filteredArr = filteredArr.length === 0 ? sourceArr : filteredArr);
};

const FilterListView = () => {
  const classes = useStyles();
  const [state, setState] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [pop, setPop] = useState({});

  const onChangeState = event => {
    setState(event.target.value);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    setPop(toFilterArr(finalArr, event.target.textContent)[0]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const searchBarProps = {
    value: state,
    onChangeState: onChangeState
  };

  const popoverProps = {
    anchorEl: anchorEl,
    handleClose: handleClose,
    itemToPopover: pop
  };

  const arr = [
    {
      name: "Item1",
      created_at: "2011-10-05T14:48:00.000Z",
      updated_at: "2014-10-05T14:48:00.000Z"
    },
    {
      name: "Item2",
      created_at: "2012-10-05T14:48:00.000Z",
      updated_at: "2016-10-05T14:48:00.000Z"
    },
    {
      name: "Item3",
      created_at: "2010-10-05T14:48:00.000Z",
      updated_at: "2015-10-05T14:48:00.000Z"
    },
    {
      name: "Sth1",
      created_at: "2010-10-05T14:48:00.000Z",
      updated_at: "2013-10-05T14:48:00.000Z"
    },
    {
      name: "Sth2",
      created_at: "2010-10-05T14:48:00.000Z",
      updated_at: "2019-10-05T14:48:00.000Z"
    }
  ];

  let finalArr = [];
  arr.map(item => {
    if (finalArr.length === 0) {
      finalArr.push(item);
    } else {
      // if (parseISO(finalArr[0].updated_at) < parseISO(item.updated_at)) {
      if (new Date(finalArr[0].updated_at) < new Date(item.updated_at)) {
        finalArr.unshift(item);
      } else {
        finalArr.push(item);
      }
    }
  });

  const arrToDisplay = toFilterArr(finalArr, state);

  return (
    <div className={classes.root}>
      <SearchBar {...searchBarProps} />
      <List component="nav" aria-label="secondary mailbox folders">
        {arrToDisplay.map(({ name, created_at, updated_at }, index) => (
          <ListItem button key={index} onClick={handleClick}>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
      <Popover {...popoverProps} />
    </div>
  );
};

export default FilterListView;
