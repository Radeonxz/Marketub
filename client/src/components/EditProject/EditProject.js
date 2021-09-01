import React, { useState } from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: "relative"
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1
	},
	inputContainer: {
		display: "flex",
		flexWrap: "wrap",
		marginTop: "3rem"
	},
	inputGroup: {
		maxWidth: "651px",
		position: "relative",
		left: "50%",
		transform: "translateX(-50%)"
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: "47%"
	}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const EditProjectView = (props) => {
	const classes = useStyles();
	const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
	const checkedIcon = <CheckBoxIcon fontSize="small" />;

	const [state, setState] = useState({
		isUpdate: false,
		project_id: "",
		name: "",
		timestamp: "",
		description: "",
		skill_sets: [],
		screenshot: "",
		github_link: "",
		site_link: ""
	});

	const { isEdit, editProject } = props;
	if (
		!_.isEmpty(editProject) &&
		editProject.project_id !== state.project_id &&
		!state.isUpdate
	) {
		setState({
			project_id: editProject.project_id,
			name: editProject.name,
			timestamp: editProject.timestamp,
			description: editProject.description,
			skill_sets: editProject.skill_sets,
			screenshot: editProject.screenshot,
			github_link: editProject.github_link,
			site_link: editProject.site_link
			// isUpdate: true
		});
	}

	const onChange = (e) => {
		const { name, value } = e.target;
		if (name === "skill_sets") {
			setState((prevState) => {
				return { ...prevState, ...skillsets.push(value) };
			});
		} else {
			setState((prevState) => {
				return { ...prevState, ...{ [name]: value } };
			});
		}
	};

	const onClose = () => {
		props.editToggle();
		setState({
			isUpdate: false
		});
	};

	const onSave = () => {
		props.addProject(state);
		props.editToggle();
		setState({
			isUpdate: false,
			project_id: "",
			name: "",
			timestamp: "",
			description: "",
			skill_sets: [],
			screenshot: "",
			github_link: "",
			site_link: ""
		});
	};

	return (
		<div>
			<Dialog
				fullScreen
				open={isEdit}
				onClose={props.editToggle}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={onClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							{editProject && editProject.project_id
								? "Update project"
								: "Add a new project"}
						</Typography>
						<Button autoFocus color="inherit" onClick={onSave}>
							save
						</Button>
					</Toolbar>
				</AppBar>
				<div className={classes.inputContainer}>
					<div className={classes.inputGroup}>
						<TextField
							label="Project Name"
							name="name"
							id="margin-none"
							value={state.name && state.name}
							required
							className={classes.textField}
							onChange={onChange}
						/>
						<TextField
							label="Timestamp"
							name="timestamp"
							id="margin-none"
							value={state.timestamp && state.timestamp}
							required
							className={classes.textField}
							onChange={onChange}
						/>
						<TextField
							id="standard-full-width"
							label="Description"
							name="description"
							value={state.description && state.description}
							required
							style={{ width: "97%", margin: 8 }}
							onChange={onChange}
						/>
						<Autocomplete
							multiple
							options={skillsets}
							name="skill_sets"
							onChange={onChange}
							disableCloseOnSelect
							getOptionLabel={(option) => option.title}
							renderOption={(option, { selected }) => (
								<React.Fragment>
									<Checkbox
										icon={icon}
										checkedIcon={checkedIcon}
										// style={{ marginRight: 8 }}
										checked={selected}
									/>
									{option.title}
								</React.Fragment>
							)}
							style={{ margin: 8 }}
							renderInput={(params) => (
								<TextField {...params} label="Skillsets" fullWidth />
							)}
						/>
						<TextField
							id="standard-full-width"
							label="Screenshot"
							name="screenshot"
							value={state.screenshot && state.screenshot}
							style={{ width: "97%", margin: 8 }}
							onChange={onChange}
						/>
						<TextField
							id="standard-full-width"
							label="Github Link"
							name="github_link"
							value={state.github_link && state.github_link}
							style={{ width: "97%", margin: 8 }}
							onChange={onChange}
						/>
						<TextField
							id="standard-full-width"
							name="site_link"
							label="Site Link"
							value={state.site_link && state.site_link}
							style={{ width: "97%", margin: 8 }}
							onChange={onChange}
						/>
					</div>
					<div></div>
				</div>
			</Dialog>
		</div>
	);
};

const skillsets = [
	{ title: "REST" },
	{ title: "GraphQL" },
	{ title: "Socket" },
	{ title: "ReactJS" },
	{ title: "AngularJS" },
	{ title: "VueJS" },
	{ title: "NodeJS" },
	{ title: "ExpressJS" },
	{ title: "MongoDB" },
	{ title: "MySQL" }
];

export default EditProjectView;
