import React, { Component } from 'react';
import { Card, CardBody, CardText, CardTitle, Collapse } from 'reactstrap';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkIcon from '@material-ui/icons/Link';

import './UserProjectsListCollapse.css';

export default class UserProjectsListCollapse extends Component {
  render() {
    const { user_projects } = this.props;
    return (
      <Collapse
        isOpen={this.props.collapse}
        className="user-projects-list-collapse"
      >
        {user_projects.projects_array
          ? user_projects.projects_array.map(
              ({
                project_id,
                name,
                description,
                screenshot,
                site_link,
                github_link,
                skill_sets,
                timestamp,
                likes
              }) => (
                <Card className="user-projects-list-card" key={project_id}>
                  <CardBody className="user-projects-list-card-body">
                    <div className="user-projects-list-card-img">
                      <img width="100%" src={screenshot} alt="Avatar" />
                    </div>
                    <div className="user-projects-list-card-content">
                      <CardTitle className="user-projects-card-title">
                        <strong>Name: {name}</strong>
                      </CardTitle>
                      <CardText className="user-projects-card-text">
                        {/* <strong>Desc:</strong>*/} {description}
                      </CardText>
                      <CardText className="user-projects-card-text">
                        <strong>Skill Sets:</strong>{' '}
                        {skill_sets.map(skill => (
                          <Chip
                            variant="outlined"
                            color="primary"
                            size="small"
                            style={{ margin: '0.1rem' }}
                            label={skill}
                          />
                        ))}
                      </CardText>
                      <CardText className="user-projects-card-text">
                        <strong>Timestamp:</strong> {timestamp}
                      </CardText>
                      <CardText className="user-projects-card-text">
                        <strong>Likes:</strong> {likes}
                      </CardText>
                      <IconButton
                        aria-label="Github Link"
                        href={github_link}
                        target="_blank"
                      >
                        <GitHubIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Site Link"
                        href={site_link}
                        target="_blank"
                      >
                        <LinkIcon />
                      </IconButton>
                    </div>
                  </CardBody>
                </Card>
              )
            )
          : null}
      </Collapse>
    );
  }
}
