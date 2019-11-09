import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  }
}));

const SimpleTooltips = props => {
  const classes = useStyles();

  return (
    <div>
      <Tooltip title="Add" aria-label="add">
        <Fab color="secondary" className={classes.absolute}>
          <AddIcon onClick={props.editToggle} />
        </Fab>
      </Tooltip>
    </div>
  );
};

export default SimpleTooltips;
