import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import GitHubIcon from "@material-ui/icons/GitHub";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
	card: {
		position: "relative",
		left: "50%",
		transform: "translateX(-50%)",
		height: 210,
		maxWidth: 290
	},
	avatar: {
		backgroundColor: red[500]
	},
	content: {
		textAlign: "center"
	},
	actions: {
		justifyContent: "center"
	}
}));

const UserCard = ({ username, created_at, github_link, projects_array }) => {
	const classes = useStyles();

	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<Card className={classes.card}>
				<CardHeader
					avatar={
						<Avatar aria-label="recipe" className={classes.avatar}>
							{username}
						</Avatar>
					}
					action={
						<IconButton aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					}
					title={username}
					subheader={`Member since ${moment(created_at).format("MMM YYYY")}`}
				/>
				<CardContent>
					<Typography component="p">Popularity: 199</Typography>
				</CardContent>
				<CardActions disableSpacing>
					{github_link && (
						<IconButton
							aria-label="Github Link"
							href={github_link}
							target="_blank"
						>
							<GitHubIcon />
						</IconButton>
					)}
					{projects_array.length > 0 && (
						<Button variant="contained" color="primary">
							<Link
								to={`/user/${username}/projects`}
								style={{ color: "white" }}
							>
								Projects
							</Link>
						</Button>
					)}
				</CardActions>
			</Card>
		</Grid>
	);
};

export default UserCard;
