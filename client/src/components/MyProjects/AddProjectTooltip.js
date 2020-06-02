import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(3)
  }
}));

const SimpleTooltips = ({ editToggle }) => {
  const classes = useStyles();

  return (
    <div>
      <Tooltip title="Add" aria-label="add">
        <Fab color="primary" className={classes.absolute}>
          <AddIcon onClick={editToggle} />
        </Fab>
      </Tooltip>
    </div>
  );
};

SimpleTooltips.propTypes = {
  /**
   * Method to toggle edit
   */
  editToggle: PropTypes.func.isRequired
};

export default SimpleTooltips;
