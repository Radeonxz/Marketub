import React, { useState, useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

import CircularProgress from "@material-ui/core/CircularProgress";

// import view component
import MyProjects from "../../components/MyProjects";
import EditProjectView from "../../components/EditProjectView";

const MyProjectsPageContainer = ({
  match: { params },
  loading,
  my_projects,
  user_projects,
  getUser,
  getProjects,
  addProject,
  updateProject,
  deleteProject
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isOwner, setIsOwner] = useState(true);
  const [editProject, setEditProject] = useState({});

  useEffect(() => {
    if (!_.isEmpty(params)) {
      const { username } = params;
      setIsOwner(false);
      getUser(username);
    } else {
      getProjects();
    }
  }, []);

  const editToggle = project => {
    setEditProject(project);
    setIsEdit(!isEdit);
  };

  const myProjectsProps = {
    user_projects: isOwner ? my_projects : user_projects.projects_array,
    isOwner,
    editToggle,
    deleteProject
  };

  const editProjectViewProps = {
    isEdit,
    editProject,
    editToggle,
    addProject,
    updateProject
  };

  return (
    <>
      {loading && (
        <CircularProgress
          size="3rem"
          style={{ position: "relative", left: "50%", color: "white" }}
        />
      )}
      {(!_.isEmpty(user_projects) || isOwner) && !loading && (
        <div>
          <MyProjects {...myProjectsProps} />
          {isOwner && <EditProjectView {...editProjectViewProps} />}
        </div>
      )}
    </>
  );
};

MyProjectsPageContainer.defaultProps = {
  loading: false,
  my_projects: [],
  user_projects: {}
};

MyProjectsPageContainer.propTypes = {
  /**
   * Loading status for get projects
   */
  loading: PropTypes.bool.isRequired,
  /**
   * Current user's own projects
   */
  my_projects: PropTypes.array,
  /**
   * User projects details object
   */
  user_projects: PropTypes.object,
  /**
   * Method to get project
   */
  getProjects: PropTypes.func.isRequired,
  /**
   * Method to add project
   */
  addProject: PropTypes.func.isRequired,
  /**
   * Method to update project
   */
  updateProject: PropTypes.func.isRequired,
  /**
   * Method to delete project
   */
  deleteProject: PropTypes.func.isRequired
};

export default MyProjectsPageContainer;
