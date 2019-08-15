import React, { Component, Fragment } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  Collapse,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { getUsers, getUser } from '../actions/userActions';
import PropTypes from 'prop-types';

class UsersList extends Component {
  state = {
    collapse: false,
    user_projects: []
  }

  static propTypes = {
    getUsers: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  componentDidMount() {
    this.props.getUsers();
  }

  onFetchUserClick = username => {
    if(this.props.user.user_projects.length === 0) {
      this.props.getUser(username);
    }
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    const { users, user_projects } = this.props.user;

    return(
      <Container>
        <Row>
          {users.map(({ user_id, username }) => (
            // <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <Col lg='3' md='4' sm='6' key={user_id}>
              <Card>
                <CardBody>
                  <Row>
                    <Col sm='5'>
                      <img width='100%' src='https://randomuser.me/api/portraits/lego/2.jpg' alt='Avatar' />
                    </Col>
                    <Col sm='7'>
                      <CardTitle className='allusers-card-title'><strong>{username}</strong></CardTitle>
                      <CardText className='allusers-card-text'>Popularity: 199</CardText>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className='text-center'>
                  <Fragment>
                    <Button color="primary" onClick={this.onFetchUserClick.bind(this, username)} style={{ marginBottom: '1rem' }}>
                      Toggle
                    </Button>
                  </Fragment>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
        <Collapse isOpen={this.state.collapse}>
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
            <Col lg='12' md='12' sm='12' key={ project_id }>
              <Card className='user-projects-list-card'>
                <CardBody>
                  <Row>
                    <Col sm='8'>
                      <img width='80%' src='https://randomuser.me/api/portraits/lego/2.jpg' alt='Avatar' />
                    </Col>
                    <Col sm='4'>
                      <CardTitle className='allusers-card-title'><strong>Project name: {name}</strong></CardTitle>
                      <CardText className='allusers-card-text'>Desc: {description}</CardText>
                      <CardText className='allusers-card-text'>Site Link: {site_link}</CardText>
                      <CardText className='allusers-card-text'>Github: {github_link}</CardText>
                      <CardText className='allusers-card-text'>Skill Sets: {skill_sets}</CardText>
                      <CardText className='allusers-card-text'>Timestamp: {timestamp}</CardText>
                      <CardText className='allusers-card-text'>Likes: {likes}</CardText>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          )) : null}
        </Collapse>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.auth.isAuthenticated
}); 

export default connect(
  mapStateToProps,
  { getUsers, getUser }
)(UsersList);