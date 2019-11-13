import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Popper,
  Paper,
  ClickAwayListener,
  MenuItem,
  MenuList
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkIcon from "@material-ui/icons/Link";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles(theme => ({
  card: {
    width: "20rem",
    height: "28rem",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const options = ["Edit", "Delete"];

const ProjectCard = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const {
    project_id,
    timestamp,
    name,
    description,
    screenshot,
    skill_sets,
    github_link,
    site_link
  } = props.project;
  const { isOwner } = props;

  const handleMenuItemClick = (event, index) => {
    if (index === 0) {
      props.editToggle(props.project);
    } else if (index === 1) {
      props.deleteProject(project_id);
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          isOwner && (
            <IconButton
              aria-label="settings"
              ref={anchorRef}
              onClick={handleToggle}
            >
              <MoreVertIcon aria-owns={open ? "menu-list-grow" : undefined} />
            </IconButton>
          )
        }
        title={name}
        subheader={`Created at: ${timestamp}`}
      />
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        placement="bottom-end"
      >
        <Paper id="menu-list-grow">
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList>
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  disabled={index === 2}
                  onClick={event => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
        )}
      </Popper>
      <CardMedia
        className={classes.media}
        image={screenshot}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component={"span"}>
          {description}
          <br />
          <strong>Skill Sets:</strong>{" "}
          {skill_sets.map((skill, index) => (
            <Chip
              key={index}
              variant="outlined"
              color="primary"
              size="small"
              style={{ margin: "0.1rem" }}
              label={skill}
            />
          ))}
        </Typography>
      </CardContent>
      <Divider />
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
        {site_link && (
          <IconButton aria-label="Site Link" href={site_link} target="_blank">
            <LinkIcon />
          </IconButton>
        )}
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectCard;
