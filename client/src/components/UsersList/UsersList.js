import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import UserCard from "../UserCard";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: "1rem 10rem"
	}
}));

const RecipeReviewCard = ({ usersList }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				{usersList.map((user) => (
					<UserCard {...user} key={user.user_id} />
				))}
			</Grid>
		</div>
	);
};

export default RecipeReviewCard;
