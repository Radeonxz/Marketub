import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid, Paper } from '@material-ui/core';
import ProjectCard from './ProjectCard';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  }
}));

const MyProjectsView = props => {
  const classes = useStyles();
  return (
    // <Grid container className={classes.root} spacing={2}>
    <Grid lg={12}>
      <Grid container justify="center" spacing={8}>
        {[0, 1, 2].map(value => (
          <Grid key={value} item>
            <ProjectCard className={classes.paper} />
          </Grid>
        ))}
      </Grid>
    </Grid>
    // </Grid>
  );
};

MyProjectsView.propTypes = {};

export default MyProjectsView;
