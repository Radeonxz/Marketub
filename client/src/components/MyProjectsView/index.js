import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid } from '@material-ui/core';
import ProjectCard from './ProjectCard';
import AddProjectTooltip from './AddProjectTooltip';

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
  const { user_projects } = props;
  return (
    <Grid item lg={12}>
      <AddProjectTooltip editToggle={props.editToggle} />
      <Grid container justify="center" spacing={8}>
        {user_projects.map(project => (
          <Grid key={project.project_id} item>
            <ProjectCard className={classes.paper} project={project} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

MyProjectsView.propTypes = {
  user_projects: PropTypes.array,
  editToggle: PropTypes.func
};

export default MyProjectsView;
