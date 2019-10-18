import React, { Component, Fragment } from 'react';
import {
  NavLink,
  Container,
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProjects, addProject, updateProject, deleteProject } from '../../actions/projectActions';

class MyProjects extends Component {
  static propTypes = {
    getProjects: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  componentDidMount() {
    this.props.getProjects();
  }

  onDeleteClick = project_id => {
    this.props.deleteProject(project_id);
  }

  render() {
    // const { user_projects } = this.props.user_projects;
    return(
      // <Container>
      //   <ListGroup>
      //     <TransitionGroup className="shopping-list">
      //       {user_projects.map(({ project_id, name }) => (
      //         <CSSTransition key={project_id} timeout={500} classNames="fade">
      //           <ListGroupItem>
      //           { this.props.isAuthenticated ? <Button
      //               className="remove-btn"
      //               color="danger"
      //               size="sm"
      //               onClick={this.onDeleteClick.bind(this, project_id)}
      //             >&times;</Button> : null }
                  
      //             {name}
      //           </ListGroupItem>
      //         </CSSTransition>
      //       ))}
      //     </TransitionGroup>
      //   </ListGroup>
      // </Container>
      <Fragment>
        <NavLink onClick={this.props.logout} href='#'>
          MyProjects
        </NavLink>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getProjects, addProject, updateProject, deleteProject }
)(MyProjects);