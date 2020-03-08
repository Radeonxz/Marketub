import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: "1rem 10rem"
  },
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.text}>
        <div>
          <h1>Oops! 404 Not Found</h1>
          <p className="lead">The page you are looking for does not exist...</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
