import React, { useState, useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

// import view component
import MyProjectsView from "../../components/MyProjectsView";
import EditProjectView from "../../components/EditProjectView";

const MyProjectsPageContainer = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isOwner, setIsOwner] = useState(true);
  const [editProject, setEditProject] = useState({});

  useEffect(() => {
    if (!_.isEmpty(this.props.match.params)) {
      const { username } = this.props.match.params;
      setIsOwner(false);
      this.props.getUser(username);
    } else {
      this.props.getProjects();
    }
  }, []);

  editToggle = project => {
    setEditProject(project);
    setIsEdit(!isEdit);
  };

  const { user_projects, my_projects } = this.props;

  return (
    (!_.isEmpty(user_projects) || isOwner) && (
      <div>
        <MyProjectsView
          user_projects={isOwner ? my_projects : user_projects.projects_array}
          isOwner={isOwner}
          editToggle={this.editToggle}
          deleteProject={this.props.deleteProject}
        />
        {isOwner && (
          <EditProjectView
            isEdit={isEdit}
            editProject={editProject}
            editToggle={this.editToggle}
            addProject={this.props.addProject}
            updateProject={this.props.updateProject}
          />
        )}
      </div>
    )
  );
};

MyProjectsPageContainer.propTypes = {
  my_projects: PropTypes.array,
  user_projects: PropTypes.object,
  getProjects: PropTypes.func.isRequired
};

export default MyProjectsPageContainer;
