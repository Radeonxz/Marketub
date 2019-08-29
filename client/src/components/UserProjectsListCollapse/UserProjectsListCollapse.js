import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Collapse
} from 'reactstrap';

import './UserProjectsListCollapse.css';

export default class UserProjectsListCollapse extends Component {
  
  render() {
    const { user_projects } = this.props;
    return(
      <Collapse isOpen={this.props.collapse} className='user-projects-list-collapse'>
        {user_projects.projects_array ? user_projects.projects_array.map(({
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
          <Card className='user-projects-list-card' key={ project_id }>
            <CardBody className='user-projects-list-card-body'>
              <div className='user-projects-list-card-img'>
                <img width='100%' src='https://randomuser.me/api/portraits/lego/2.jpg' alt='Avatar' />
              </div>
              <div className='user-projects-list-card-content'>
                <CardTitle className='user-projects-card-title'><strong>Project name: {name}</strong></CardTitle>
                <CardText className='user-projects-card-text'><strong>Desc:</strong> {description}</CardText>
                <CardText className='user-projects-card-text'><strong>Site Link:</strong> {site_link}</CardText>
                <CardText className='user-projects-card-text'><strong>Github:</strong> {github_link}</CardText>
                <CardText className='user-projects-card-text'><strong>Skill Sets:</strong> {skill_sets}</CardText>
                <CardText className='user-projects-card-text'><strong>Timestamp:</strong> {timestamp}</CardText>
                <CardText className='user-projects-card-text'><strong>Likes:</strong> {likes}</CardText>
              </div>
            </CardBody>
          </Card>
        )) : null}
      </Collapse>
    );
  }
}