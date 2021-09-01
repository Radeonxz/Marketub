import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Grid } from "@material-ui/core";
import ProjectCard from "./ProjectCard";
import AddProjectTooltip from "./AddProjectTooltip";

const useStyles = makeStyles((theme) => ({
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

const MyProjects = ({ user_projects, isOwner, editToggle, deleteProject }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={4}>
				{isOwner && <AddProjectTooltip editToggle={editToggle} />}
				{user_projects.map((project) => (
					<Grid key={project.project_id} item xs={12} md={6} lg={4}>
						<ProjectCard
							className={classes.paper}
							project={project}
							isOwner={isOwner}
							editToggle={editToggle}
							deleteProject={deleteProject}
						/>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

MyProjects.propTypes = {
	/**
	 * User projects details object
	 */
	user_projects: PropTypes.array.isRequired,
	/**
	 * Boolean of current user is owner or not
	 */
	isOwner: PropTypes.bool.isRequired,
	/**
	 * Method to toggle edit
	 */
	editToggle: PropTypes.func.isRequired,
	/**
	 * Method to delete project
	 */
	deleteProject: PropTypes.func.isRequired
};

export default MyProjects;
