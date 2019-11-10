import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Grid } from "@material-ui/core";
import ProjectCard from "./ProjectCard";
import AddProjectTooltip from "./AddProjectTooltip";
import { relative } from "path";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "1rem 10rem",
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100,
    padding: theme.spacing(2)
  }
}));

const MyProjectsView = props => {
  const classes = useStyles();
  const { user_projects, isOwner } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        {isOwner && <AddProjectTooltip editToggle={props.editToggle} />}
        {/* <Grid spacing={2} item> */}
        {user_projects.map(project => (
          <Grid
            key={project.project_id}
            // spacing={2}
            item
            xs={12}
            md={6}
            lg={4}
          >
            <ProjectCard
              className={classes.paper}
              project={project}
              isOwner={isOwner}
            />
          </Grid>
        ))}
        {/* </Grid> */}
      </Grid>
    </div>
  );
};

MyProjectsView.propTypes = {
  user_projects: PropTypes.array,
  editToggle: PropTypes.func
};

export default MyProjectsView;
