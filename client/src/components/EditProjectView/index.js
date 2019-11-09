import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import GitHubIcon from '@material-ui/icons/GitHub';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  inputContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '3rem'
  },
  inputGroup: {
    maxWidth: '651px',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '47%'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditProjectView = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      <Dialog
        fullScreen
        open={props.isEdit}
        onClose={props.editToggle}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.editToggle}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add new project
            </Typography>
            <Button autoFocus color="inherit" onClick={props.editToggle}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.inputContainer}>
          <div className={classes.inputGroup}>
            <TextField
              label="Project Name"
              id="margin-none"
              required
              className={classes.textField}
            />
            <TextField
              label="Timestamp"
              id="margin-none"
              required
              className={classes.textField}
            />
            <TextField
              id="standard-full-width"
              label="Description"
              required
              style={{ width: '97%', margin: 8 }}
            />
            <Autocomplete
              multiple
              options={skillsets}
              disableCloseOnSelect
              getOptionLabel={option => option.title}
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
              renderInput={params => (
                <TextField {...params} label="Skillsets" fullWidth />
              )}
            />
            <TextField
              id="standard-full-width"
              label="Screenshot"
              style={{ width: '97%', margin: 8 }}
            />
            <TextField
              id="standard-full-width"
              label="Github Link"
              style={{ width: '97%', margin: 8 }}
            />
            <TextField
              id="standard-full-width"
              label="Site Link"
              style={{ width: '97%', margin: 8 }}
            />
          </div>
          <div></div>
        </div>
      </Dialog>
    </div>
  );
};

const skillsets = [
  { title: 'REST' },
  { title: 'GraphQL' },
  { title: 'ReactJS' },
  { title: 'AngularJS' },
  { title: 'VueJS' },
  { title: 'NodeJS' },
  { title: 'ExpressJS' },
  { title: 'MongoDB' },
  { title: 'MySQL' }
];

export default EditProjectView;
